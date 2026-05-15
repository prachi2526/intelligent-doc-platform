import chromadb
from sentence_transformers import SentenceTransformer

client = chromadb.Client()

collection = client.create_collection(
    name="pdf_embeddings"
)

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)


def store_embeddings(
    chunks,
    embeddings,
    owner_email,
    document_id
):

    ids = []

    metadatas = []

    for i, chunk in enumerate(chunks):

        ids.append(f"{document_id}_{i}")

        metadatas.append({
            "owner_email": owner_email,
            "document_id": str(document_id)
        })

    collection.add(
        embeddings=embeddings,
        documents=chunks,
        ids=ids,
        metadatas=metadatas
    )


def query_embeddings(
    question,
    owner_email
):

    question_embedding = model.encode(
        [question]
    ).tolist()

    results = collection.query(
        query_embeddings=question_embedding,
        n_results=3,
        where={
            "owner_email": owner_email
        }
    )

    return results