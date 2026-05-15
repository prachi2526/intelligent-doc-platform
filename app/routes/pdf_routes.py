from fastapi import APIRouter, UploadFile, File, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
import shutil

from app.database.db import get_db
from app.models.document_model import Document

from app.services.pdf_service import extract_text_from_pdf
from app.services.openai_service import summarize_text
from app.services.chunk_service import chunk_text
from app.services.embedding_service import create_embeddings
from app.services.vector_db_service import (
    store_embeddings,
    query_embeddings
)

from app.dependencies.auth_dependency import get_current_user

router = APIRouter()


class QuestionRequest(BaseModel):
    question: str


@router.post("/upload")
async def upload_pdf(
    file: UploadFile = File(...),
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    file_location = f"temp_{file.filename}"

    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    extracted_text = extract_text_from_pdf(file_location)

    chunks = chunk_text(extracted_text)

    embeddings = create_embeddings(chunks)

    summary = summarize_text(chunks[0])

    document = Document(
        filename=file.filename,
        total_chunks=len(chunks),
        owner_email=current_user
    )

    db.add(document)

    db.commit()

    db.refresh(document)

    store_embeddings(
        chunks=chunks,
        embeddings=embeddings,
        owner_email=current_user,
        document_id=document.id
    )

    return {
        "message": "PDF uploaded successfully",
        "uploaded_by": current_user,
        "filename": file.filename,
        "total_chunks": len(chunks),
        "summary": summary
    }


@router.post("/ask")
async def ask_question(
    request: QuestionRequest,
    current_user: str = Depends(get_current_user)
):

    results = query_embeddings(
        request.question,
        current_user
    )

    retrieved_chunks = results["documents"][0]

    context = "\n".join(retrieved_chunks)

    answer = summarize_text(
        f"""
        Answer the question using this context:

        Context:
        {context}

        Question:
        {request.question}
        """
    )

    return {
        "question": request.question,
        "asked_by": current_user,
        "answer": answer,
        "retrieved_chunks": retrieved_chunks
    }


@router.get("/documents")
def get_documents(
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    documents = db.query(Document).filter(
        Document.owner_email == current_user
    ).all()

    return documents


@router.delete("/documents/{document_id}")
def delete_document(
    document_id: int,
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    document = db.query(Document).filter(
        Document.id == document_id,
        Document.owner_email == current_user
    ).first()

    if not document:
        return {
            "error": "Document not found or unauthorized"
        }

    db.delete(document)

    db.commit()

    return {
        "message": "Document deleted successfully"
    }