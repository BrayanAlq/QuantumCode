from openai import OpenAI
import os
from typing import Optional, Literal
from pydantic import BaseModel

from dotenv import load_dotenv
load_dotenv(dotenv_path='.env')

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class Recomendations(BaseModel):
  title: Literal["animo", "recomendations"]
  content: str

class ArrayRecomendations(BaseModel):
  recomendations: list[Recomendations]

def ask_ai(user_message: str, instructions: Optional[str] = None):
  messages = [
    {
      "role": "system",
      "content": """
      - Si el mensaje del cliente no está vacío genera recomendaciones y mensajes de ánimos cortos basados en el mensaje del usuario. Puedes mandar como máximo 10 (pueden ser menos) entre recomendaciones y mensajes de ánimo. A los mensajes de ánimo le pones title 'animo' y a las recomendaciones 'recomendations'.
      - Si el mensaje de cliente está vacío, responde con 'Todavía no has ingresado información suficiente para generar recomendaciones'. Con el title 'recomendations'
      """
    }
  ]

  if instructions:
    messages.append({
      "role": "system",
      "content": instructions
    })
  
  messages.append({"role": "user", "content": f"{user_message}"})

  completion = client.beta.chat.completions.parse(
    model="gpt-4o-mini",
    messages=messages,
    response_format= ArrayRecomendations
  )

  return completion.choices[0].message.parsed