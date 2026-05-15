from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from hashlib import sha256
from datetime import datetime, timedelta
import jwt

from app.database.db import SessionLocal
from app.models.user_model import User
from app.schemas.user_schema import UserCreate

router = APIRouter()

SECRET_KEY = "mysecretkey"
ALGORITHM = "HS256"


# Database Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Password Hashing
def hash_password(password: str):
    return sha256(password.encode()).hexdigest()


# Create JWT Token
def create_access_token(data: dict):

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(hours=24)

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt


@router.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="User already exists"
        )

    hashed_pw = hash_password(user.password)

    new_user = User(
        email=user.email,
        hashed_password=hashed_pw
    )

    db.add(new_user)

    db.commit()

    return {
        "message": "User created successfully"
    }


@router.post("/login")
def login(user: UserCreate, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not existing_user:
        raise HTTPException(
            status_code=400,
            detail="Invalid credentials"
        )

    hashed_pw = hash_password(user.password)

    if existing_user.hashed_password != hashed_pw:
        raise HTTPException(
            status_code=400,
            detail="Invalid credentials"
        )

    access_token = create_access_token(
        data={"sub": existing_user.email}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }