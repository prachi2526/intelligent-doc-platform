from pypdf import PdfReader
from app.services.embedding_service import create_embeddings
from app.services.vector_db_service import store_embeddings
def extract_text_from_pdf(file_path):

    reader = PdfReader(file_path)

    text = ""

    for page in reader.pages:
        extracted = page.extract_text()

        if extracted:
            text += extracted

    return text