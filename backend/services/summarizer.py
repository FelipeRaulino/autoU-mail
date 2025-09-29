import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

HF_TOKEN = os.getenv("HF_TOKEN")

client = OpenAI(
    base_url="https://router.huggingface.co/v1",
    api_key=HF_TOKEN
)

def summarize_file(content: str) -> str:
  if not content:
    return ""
  
  prompt = f"""
    Você é um assistente que resume documentos.
    Gere um resumo curto (máximo 150 palavras) destacando pontos relevantes
    que poderiam ajudar a responder emails.

    Documento:
    \"\"\"{content}\"\"\"
    """

  response = client.responses.create(
      model="meta-llama/Llama-3.1-8B-Instruct:nscale",  # ou outro modelo
      input=prompt,
  )
  
  return response.output[0].content[0].text.strip()