from sqlalchemy import Column, Integer, String
from app.database.db import Base


class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)

    filename = Column(String)

    total_chunks = Column(Integer)

    owner_email = Column(String)