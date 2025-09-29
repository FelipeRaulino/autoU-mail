import os
from openai import OpenAI
from dotenv import load_dotenv
import re
import json

load_dotenv()

HF_TOKEN = os.getenv("HF_TOKEN")

client = OpenAI(
    base_url="https://router.huggingface.co/v1",
    api_key=HF_TOKEN
)

def classify_email_with_context(email_text: str, file_summary: str = "") -> dict:
    """Classifica email e gera auto_reply, com contexto opcional do arquivo"""
    context = email_text
    if file_summary:
        context += f"\n\n[Resumo do documento anexado]: {file_summary}"

    prompt = f"""
    Você é um assistente que classifica emails como **Produtivo** ou **Improdutivo** 
    e também gera uma resposta automática apropriada.

    Definições:
    - Produtivo: Emails que requerem uma ação ou resposta específica (ex.: solicitações de suporte técnico, atualização sobre casos em aberto, dúvidas sobre o sistema).
    - Improdutivo: Emails que não necessitam de uma ação imediata (ex.: mensagens de felicitações, agradecimentos).

    Email recebido (com contexto se houver):
    \"\"\"{context}\"\"\"

    ⚠️ IMPORTANTE: Responda apenas com um JSON válido, sem explicações, sem comentários e sem nenhum texto fora do JSON.

    Formato esperado:
    {{
        "classification": "Produtivo ou Improdutivo",
        "auto_reply": "sua resposta automática (mínimo 80 caracteres)"
    }}
    """

    response = client.responses.create(
        model="deepseek-ai/DeepSeek-R1:novita",
        input=prompt,
    )

    raw_output = response.output[0].content[0].text

    # Extrair apenas o JSON
    match = re.search(r'\{.*\}', raw_output, re.DOTALL)
    if match:
        try:
            return json.loads(match.group(0))
        except json.JSONDecodeError:
            return {"error": "Falha ao decodificar JSON", "raw": raw_output}
    else:
        return {"error": "Nenhum JSON encontrado", "raw": raw_output}
