from fastapi import UploadFile
import aiofiles
import fitz

async def extract_file_content(file: UploadFile) -> str:
  if file.filename.endswith('.txt'):
    async with aiofiles.open(file.filename, 'wb') as out_file: 
      content = await file.read() 
      await out_file.write(content)

    async with aiofiles.open(file.filename, 'r') as f:
      return f.read()
  
  elif file.filename.endswith('.pdf'):
    content = await file.read() 
    with open("temp.pdf", "wb") as f: 
      f.write(content)

    doc = fitz.open("temp.pdf")
    
    text = ""
    for page in doc:
      text += page.get_text()
    return text.strip()
  
  else:
    return ""

