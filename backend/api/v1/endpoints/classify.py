from fastapi import APIRouter, Request, Form, File, UploadFile, HTTPException, status
from fastapi.responses import JSONResponse
from typing import Optional
from services.file_extractor import extract_file_content
from services.summarizer import summarize_file
from services.classifier import classify_email_with_context
from services.email_repository import save_email

router = APIRouter()

@router.post("/classify")
async def classify_email(
    text: str = Form(...),   # agora o campo 'text' é obrigatório no FormData
    file: Optional[UploadFile] = File(None)
):
    file_summary = ""
    if file:
        try:
            file_content = await extract_file_content(file)
            file_summary = summarize_file(file_content)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Error processing file: {str(e)}"
            )

    result = classify_email_with_context(text, file_summary)

    if "error" in result:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=result
        )

    try:
        save_email(
            email_text=text,
            classification=result["classification"],
            auto_reply=result["auto_reply"]
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error saving to Supabase: {str(e)}"
        )

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content=result
    )



