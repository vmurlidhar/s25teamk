import csv
import json
from google import genai
from google.genai import types

# Read the API key
with open("team-k/api_key.txt", "r") as file:
    my_api_key = file.read().strip()

client = genai.Client(api_key=my_api_key)

# File paths
symptom_file_path = "team-k/datasets/disease_dataset_symptoms.csv"
question_file_path = "team-k/datasets/disease_dataset_questions.csv"


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
formatted_questions = "\n".join(
    [
        f"- **{symptom}**: {question}"
        for symptom, question in symptom_question_map.items()
    ]
)

sys_instruct = (
    "You are a doctor diagnosing a patient based on the provided dataset.\n\n"
    "### Symptoms and Their Associated Diseases:\n"
    f"{formatted_symptom_disease}\n\n"
    "### Questions You MUST Use for Additional Symptoms:\n"
    f"{formatted_questions}\n\n"
    "When diagnosing the patient:\n"
    "- Suggest **1 to 10 likely diseases** based on symptoms.\n"
    "- Ask **2 to 8 follow-up questions**, but ONLY from the provided list above.\n"
    "- DO NOT generate your own questions; strictly use the ones listed."
)


def call_api(patient_input, *args, **kwargs):
    """Function for promptfoo to call"""
    # Ensure the patient_input is not empty or invalid
    if not patient_input or not isinstance(patient_input, str):
        return {"error": "Invalid patient input. Please provide valid symptoms."}

    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            config=types.GenerateContentConfig(
                system_instruction=sys_instruct,
                temperature=0.5,
                max_output_tokens=500,
            ),
            contents=[patient_input],
        )

        if response and hasattr(response, "text"):
            result = response.text.strip()
            if not result:
                return {"error": "Empty response received from the API."}
            return {"output": result}
        else:
            return {"error": "No valid response from the API."}

    except Exception as e:
        return {"error": str(e)}  # Return a dictionary with the 'error' key


# Example usage
if __name__ == "__main__":
    patient_input = "I feel shaky and keep forgetting things."
    result = call_api(patient_input)
    print(json.dumps({"input": patient_input, "response": result}, indent=2))
