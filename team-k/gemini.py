import csv
from google import genai
from google.genai import types

# Read the API key
with open("team-k/api_key.txt", "r") as file:
    my_api_key = file.read().strip()

client = genai.Client(api_key=my_api_key)

# File paths
symptom_file_path = "team-k/datasets/disease_dataset_symptoms.csv"
question_file_path = "team-k/datasets/disease_dataset_questions.csv"


# Function to parse CSV into dictionary format
def parse_csv_to_dict(file_path):
    data_dict = {}
    with open(file_path, "r", encoding="utf-8") as file:
        reader = csv.reader(file)
        for row in reader:
            if len(row) == 2:  # Ensure valid row structure
                symptom, value = row
                data_dict[symptom.strip()] = value.strip()
    return data_dict


# Parse symptoms-diseases mapping
symptom_disease_map = parse_csv_to_dict(symptom_file_path)

# Parse symptoms-questions mapping
symptom_question_map = parse_csv_to_dict(question_file_path)

# Format symptom-disease mapping for the system instruction
formatted_symptom_disease = "\n".join(
    [
        f"- **{symptom}**: {diseases}"
        for symptom, diseases in symptom_disease_map.items()
    ]
)

# Format symptom-question mapping for the system instruction
formatted_questions = "\n".join(
    [
        f"- **{symptom}**: {question}"
        for symptom, question in symptom_question_map.items()
    ]
)

# System instruction with structured data
sys_instruct = (
    "You are a doctor diagnosing a patient based on the provided dataset.\n\n"
    "### Symptoms and Their Associated Diseases:\n"
    f"{formatted_symptom_disease}\n\n"
    "### Questions You MUST Use for Additional Symptoms:\n"
    f"{formatted_questions}\n\n"
    "When diagnosing the patient:\n"
    "- Suggest **1 to 3 likely diseases** based on symptoms.\n"
    "- Ask **2 to 8 follow-up questions**, but ONLY from the provided list above.\n"
    "- DO NOT generate your own questions; strictly use the ones listed."
)

# Patient's input symptoms
patient_input = "When I go about my daily life, I find that I am shaking a bit and forgetting where I put my things."

# Call Gemini with structured instruction and user input
response = client.models.generate_content(
    model="gemini-2.0-flash",
    config=types.GenerateContentConfig(
        system_instruction=sys_instruct,
        temperature=0.5,
        max_output_tokens=500,
    ),
    contents=[patient_input],
)

print(response.text)
