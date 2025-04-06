# NeuroChat

## What is Neurochat?

NeuroChat is an AI-driven health assistant designed to bridge language barriers in healthcare by offering multilingual symptom assessment and care recommendations. This mobile app, with a web interface, aims to improve accessibility for underserved populations, particularly non-native speakers such as immigrants and refugees in the U.S.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). This project uses a [FastAPI](https://fastapi.tiangolo.com/) backend that utilizes a language model (gemini-2.0-flash) to assist with medical diagnosis. It also includes tools to evaluate the model’s performance in identifying and refining disease diagnoses using [promptfoo](https://github.com/promptfoo/promptfoo).

## Frontend

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Backend

### Running the FastAPI Server

To start the backend server locally, run:

```bash
uvicorn gemini:app --reload
```

### Running Promptfoo test

To test whether the LLM correctly diagnoses specific diseases, you can run evaluation scenarios using promptfoo.

```bash
promptfoo eval -c initial_diagonsis_test.yaml
promptfoo eval -c final_diagnosis_test.yaml
```

## Updating the Disease Dataset

The LLM utilizes data from the following CSV files:

- `team-k/datasets/disease_dataset_questions.csv`
- `team-k/datasets/disease_dataset_symptoms.csv`

To update the dataset, simply add the relevant diseases, symptoms, and follow-up questions to these CSV files.

Additionally, for proper localization, follow-up questions need to be added in both English and Spanish. These should be placed in the corresponding files within the `team-k/src/utils/locales` directory.
