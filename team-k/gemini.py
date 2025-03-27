import csv
import json
from typing import List
from fastapi import FastAPI, HTTPException
from google import genai
from google.genai import types
from pydantic import BaseModel

# Run the API with: uvicorn gemini:app --reload
# Initialize FastAPIs
app = FastAPI()


# Define response schema
class DiagnosisResponse(BaseModel):
    diseases: List[str]
    symptoms: List[str]


# Read the API key
with open("api_key.txt", "r") as file:
    my_api_key = file.read().strip()

client = genai.Client(api_key=my_api_key)

# File paths
symptom_file_path = "datasets/disease_dataset_symptoms.csv"
question_file_path = "datasets/disease_dataset_questions.csv"


def parse_csv_to_dict(file_path):
    """Parses a CSV file into a dictionary."""
    data_dict = {}
    with open(file_path, "r", encoding="utf-8") as file:
        reader = csv.reader(file)
        for row in reader:
            if len(row) == 2:
                symptom, value = row
                if symptom.strip() and value.strip():
                    data_dict[symptom.strip()] = value.strip()
    return data_dict


# Load mappings
symptom_disease_map = parse_csv_to_dict(symptom_file_path)
symptom_question_map = parse_csv_to_dict(question_file_path)

# Format mappings
formatted_symptom_disease = "\n".join(
    [
        f"- **{symptom}**: {diseases}"
        for symptom, diseases in symptom_disease_map.items()
    ]
)
formatted_symptoms = "\n".join(
    [f"- {symptom}" for symptom in symptom_question_map.keys()]
)


print(formatted_symptom_disease)
print(formatted_symptoms)

sys_instruct = (
    "You are a doctor diagnosing a patient based on the provided dataset. You can understand all language but must respond in English.\n\n"
    "### Symptoms and Their Associated Diseases:\n"
    f"{formatted_symptom_disease}\n\n"
    "### Follow-up Symptoms You MUST Use for Additional Symptoms:\n"
    f"{formatted_symptoms}\n\n"
    "When diagnosing the patient:\n"
    "- Otherwise, suggest **1 to 10 likely diseases** based on symptoms.\n"
    "- Choose **2 to 8 follow-up symptoms** to help narrow the diseases, but ONLY from the provided list above.\n"
    "- DO NOT generate your own diseases; strictly use the ones listed.\n"
    "- DO NOT generate your own questions; strictly use the ones listed.\n"
)


class PatientInput(BaseModel):
    symptoms: str


@app.post("/diagnose", response_model=DiagnosisResponse)
def diagnose(patient_input: PatientInput):
    """API endpoint to diagnose based on patient symptoms."""
    if not patient_input.symptoms:
        raise HTTPException(status_code=400, detail="Invalid patient input")
    print(patient_input)
    print(sys_instruct)
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=patient_input.symptoms,
            config={
                "system_instruction": sys_instruct,
                "response_mime_type": "application/json",
                "response_schema": DiagnosisResponse,
                "temperature": 0.5,
                "max_output_tokens": 2000,
            },
        )

        if not response or not hasattr(response, "text"):
            raise HTTPException(status_code=500, detail="No valid response from API")

        return response.parsed.dict()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
