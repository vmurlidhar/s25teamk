import csv
import json
from typing import List
from fastapi import FastAPI, HTTPException
from google import genai
from pydantic import BaseModel, ValidationError

# Initialize FastAPI application
app = FastAPI()

# ----------------------
# Configuration Constants
# ----------------------
API_KEY_FILE = "api_key.txt"
SYMPTOM_CSV_PATH = "datasets/disease_dataset_symptoms.csv"
QUESTION_CSV_PATH = "datasets/disease_dataset_questions.csv"
GEMINI_MODEL = "gemini-2.0-flash"
GEMINI_CONFIG = {
    "response_mime_type": "application/json",
    "temperature": 0.75,
    "max_output_tokens": 2000,
}


# ------------------
# Pydantic Models
# ------------------
class PatientInput(BaseModel):
    """Request model for patient symptoms input"""

    symptoms: str


class DiagnosisResponse(BaseModel):
    """Response model for initial diagnosis"""

    diseases: List[str]
    symptoms: List[str]


class FinalDiagnosisResponse(BaseModel):
    """Response model for final diagnosis ranking"""

    first_disease: str
    second_disease: str = ""
    third_disease: str = ""


# ------------------
# Helper Functions
# ------------------
def parse_csv_to_dict(file_path: str) -> dict:
    """Parse CSV file into a dictionary with error handling"""
    data_dict = {}
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            reader = csv.reader(file)
            for row in reader:
                if len(row) == 2 and row[0].strip() and row[1].strip():
                    key, value = row[0].strip(), row[1].strip()
                    data_dict[key] = value
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"CSV parsing error: {str(e)}")
    return data_dict


def generate_system_instruction(context: str, examples: str = "") -> str:
    """Create consistent system instructions for Gemini"""
    return f"""
    You are a medical diagnosis assistant trained to analyze symptoms and provide \
    structured responses. Follow these rules:

    1. Use ONLY the following dataset for analysis:
    {context}

    2. Response Requirements:
    {examples}

    3. Language Rules:
    - Understand all languages but respond in English
    - Use medical terminology from the dataset
    - Never invent symptoms or diseases
    """


# ------------------
# Initialization
# ------------------
# Load API key
try:
    with open(API_KEY_FILE, "r") as file:
        client = genai.Client(api_key=file.read().strip())
except FileNotFoundError:
    raise RuntimeError("API key file not found")

# Load datasets
symptom_disease_map = parse_csv_to_dict(SYMPTOM_CSV_PATH)
symptom_question_map = parse_csv_to_dict(QUESTION_CSV_PATH)

# Format dataset content
disease_context = "\n".join(
    f"- {symptom}: {diseases}" for symptom, diseases in symptom_disease_map.items()
)
symptom_list = "\n".join(f"- {symptom}" for symptom in symptom_question_map.keys())


# ------------------
# API Endpoints
# ------------------
@app.post("/diagnose", response_model=DiagnosisResponse)
async def diagnose(patient_input: PatientInput):
    """Initial diagnosis with potential diseases and follow-up questions"""
    instruction = generate_system_instruction(
        context=f"Symptoms and Associated Diseases:\n{disease_context}\n\n"
        f"Available Follow-up Symptoms:\n{symptom_list}",
        examples="- Return JSON with 'diseases' (1-10 items) and 'symptoms' (2-8 items)\n"
        "- Use exact disease names from the dataset\n"
        "- Select follow-up symptoms only from the provided list",
    )

    return await process_gemini_request(
        patient_input.symptoms, instruction, DiagnosisResponse
    )


@app.post("/final_diagnose", response_model=FinalDiagnosisResponse)
async def final_diagnose(patient_input: PatientInput):
    """Final diagnosis with top 3 disease rankings"""
    instruction = generate_system_instruction(
        context=f"Symptoms and Associated Diseases:\n{disease_context}",
        examples="- Return JSON with top 3 diseases ranked. You are allowed to leave second_disease and third_disease empty if it's a low match\n"
        "- Use keys: first_disease, second_disease, third_disease\n"
        "- Example: {'first_disease': 'X', 'second_disease': 'Y', 'third_disease': ''}",
    )

    return await process_gemini_request(
        patient_input.symptoms, instruction, FinalDiagnosisResponse
    )


# ------------------
# Core Processing
# ------------------
async def process_gemini_request(
    symptoms: str, instruction: str, response_model: type[BaseModel]
) -> BaseModel:
    """Unified request processor for Gemini API"""
    if not symptoms:
        raise HTTPException(status_code=400, detail="No symptoms provided")

    try:
        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=symptoms,
            config={"system_instruction": instruction, **GEMINI_CONFIG},
        )

        return validate_response(response.text, response_model)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"API request failed: {str(e)}")


def validate_response(response_text: str, model: type[BaseModel]) -> BaseModel:
    """Validate and parse Gemini response"""
    try:
        parsed = json.loads(response_text.strip())
        return model(**parsed)
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid JSON response from API")
    except ValidationError as e:
        raise HTTPException(
            status_code=500, detail=f"Response validation failed: {str(e)}"
        )
