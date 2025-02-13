from google import genai
from google.genai import types

# Read the API key from the text file
with open("team-k/api_key.txt", "r") as file:
    my_api_key = (
        file.read().strip()
    )  # .strip() removes any extra whitespace/newline characters

sys_instruct = (
    "You are a doctor and you are trying to diagnose a patient with one of the following diseases. "
    "Based on the list of symptoms and associated diseases below, which conditions might the patient have? "
    "What follow-up questions would you ask to help narrow it down?"
    "Diseases and Symptoms:"
    "**Parkinson's Disease**; Parkinson's disease can't be cured, but medicines can help control the symptoms. "
    "Medicines often work very well. When medicine is no longer helping, some people may have surgery. "
    "Your healthcare team also may recommend aerobic exercise, physical therapy that focuses on balancing and stretching, and speech therapy. "
    "**Symptoms**: Tremor; Slowed movement; Rigid muscles; Poor posture; Loss of automatic movement; "
    "Slurred speech; Writing changes; Depression; Poor balance; Loss of bladder or bowel control; Sleep issues."
    "**Amyotrophic Lateral Sclerosis (ALS)**; Treatments can't reverse the damage of ALS, but they can slow the progression of symptoms. "
    "They also can help prevent complications and make you more comfortable and independent. You might need a team of healthcare providers and "
    "doctors trained in many areas to provide your care. The team works together to prolong your survival and improve your quality of life. "
    "Your team works to select the right treatments for you. You have the right to choose or refuse any of the treatments suggested. "
    "**Symptoms**: Trouble walking; Leg/ankle/foot weakness; Hand fine-motor weakness or clumsiness; Slurred speech; Trouble swallowing; "
    "Muscle cramps and twitching (arms, shoulders, tongue); Emotional instability (inappropriate crying/laughing); Thinking or behavioral changes."
    "**Alzheimer's Disease**; Treatments for Alzheimer's disease include medicines that can help with symptoms and newer medicines "
    "that can help slow decline in thinking and functioning. These newer medicines are approved for people with early Alzheimer's disease. "
    "**Symptoms**: Memory loss; Trouble concentrating and thinking; Poor decision-making and judgment; Difficulty planning and performing familiar tasks; "
    "Depression; Social withdrawal; Mood swings; Sleep issues."
    "**Multiple Sclerosis**; There is no cure for multiple sclerosis. Treatment typically focuses on speeding recovery from attacks, reducing relapses, "
    "slowing the progression of the disease, and managing MS symptoms. Some people have such mild symptoms that no treatment is necessary. "
    "**Symptoms**: Numbness; Muscle weakness; Trouble walking; Blurred, double, or loss of vision."
    "**Huntington's Disease**; No treatments can alter the course of Huntington's disease. But medicines can lessen some symptoms of movement and mental health conditions. "
    "And multiple interventions can help a person adapt to changes in abilities for a certain amount of time. "
    "**Symptoms**: Involuntary movements (chorea); Trouble focusing eyes; Trouble walking; Poor balance; Trouble swallowing; "
    "Lack of impulse control; Trouble organizing/prioritizing/focusing; Depression; Obsessive-compulsive disorder; Mania; "
    "Poor posture; Slurred speech; Uncontrolled eye movements."
    "**Ataxia**; Ataxia treatment depends on the cause. If ataxia is caused by a condition such as vitamin deficiency or celiac disease, treating the condition may help improve symptoms. "
    "If ataxia results from chickenpox or other viral infections, it is likely to resolve on its own. "
    "**Symptoms**: Poor coordination; Poor balance; Trouble walking; Hand fine-motor weakness or clumsiness; Slurred speech; "
    "Uncontrolled eye movements; Trouble swallowing."
    "**Motor Neuron Disease**; There's no cure for motor neuron disease, but treatment can help reduce the impact the symptoms have on your life. "
    "Care typically involves a team of specialists, including a general practitioner. "
    "**Symptoms**: Leg/ankle/foot weakness; Slurred speech; Difficulty swallowing; Muscle cramps and twitches; Weight loss; "
    "Emotional instability (inappropriate crying/laughing)."
    "**Multiple System Atrophy**; Treatment for multiple system atrophy (MSA) involves managing your symptoms. There's no cure for MSA. "
    "Managing the disease can make you as comfortable as possible and help you maintain your body functions. "
    "**Symptoms**: Tremor; Trouble walking; Rigid muscles; Poor balance; Loss of automatic movement; Slurred speech; "
    "Blurred, double, or loss of vision; Trouble swallowing; Low blood pressure; Loss of bladder or bowel control; Reduced sweating; "
    "Sleep issues; Loss of interest in sex; Emotional instability (inappropriate crying/laughing); Poor posture."
    "**Progressive Supranuclear Palsy**; Although there is no cure for progressive supranuclear palsy, treatments are available to help ease symptoms of the disorder. "
    "**Symptoms**: Poor balance; Trouble focusing eyes; Rigid muscles; Slurred speech; Trouble swallowing; Sensitivity to bright light; "
    "Sleep issues; Emotional instability (inappropriate crying/laughing); Trouble concentrating and thinking; Depression; "
    "Characteristic surprised/frightened facial expression; Dizziness."
)

client = genai.Client(api_key=my_api_key)

response = client.models.generate_content(
    model="gemini-2.0-flash",
    config=types.GenerateContentConfig(
        system_instruction=sys_instruct,
        temperature=0.5,  # Keeps responses factual
        max_output_tokens=500,  # Ensures a complete response
    ),
    contents=[
        "I have the following symptoms: shaking and forgetting where I put my belongings. "
    ],
)
print(response.text)
