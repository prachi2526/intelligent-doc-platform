from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.db import Base, engine

from app.models.user_model import User
from app.models.document_model import Document

from app.routes.auth_routes import router as auth_router
from app.routes.pdf_routes import router as pdf_router

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(auth_router)
app.include_router(pdf_router)

@app.get("/")
def root():
    return {"message": "Intelligent Doc Platform API running"}