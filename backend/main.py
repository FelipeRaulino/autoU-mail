from fastapi import FastAPI
from api.v1.endpoints import classify
from api.v1.endpoints import history
from starlette.middleware.cors import CORSMiddleware

app = FastAPI(title="Email Productivity Classifier")

origins = [
  "http://localhost:3000"
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"]
)

# Inclui as rotas
app.include_router(classify.router, prefix="/v1", tags=["classify"])
app.include_router(history.router, prefix="/v1", tags=["history"])
