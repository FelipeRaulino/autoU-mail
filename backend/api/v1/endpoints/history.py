from fastapi import APIRouter, HTTPException, status
from fastapi.responses import JSONResponse
from services.email_repository import get_emails

router = APIRouter()

@router.get('/history')
def history():
  try:
    response = get_emails()
    return JSONResponse(
      status_code=status.HTTP_200_OK,
      content=response
    )
  except Exception as e:
    raise HTTPException(
      status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
      detail=f"Error saving to Supabase: {str(e)}"
    )