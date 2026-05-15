from groq import Groq
from app.core.config import GROQ_API_KEY

client = Groq(api_key=GROQ_API_KEY)

def summarize_text(text):

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": f"Summarize this:\n{text}"
            }
        ]
    )

    return response.choices[0].message.content