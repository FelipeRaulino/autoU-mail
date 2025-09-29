from core.config import supabase

def save_email(email_text: str, classification: str, auto_reply: str):
  data = {
    "email_text": email_text,
    "classification": classification,
    "auto_reply": auto_reply
  }

  response = supabase.table("emails").insert(data).execute()
  return response.data

def get_emails():
  response = supabase.table("emails").select("*").execute()
  return response.data