from datetime import datetime, timedelta
import hashlib

from jose import jwt

SECRET_KEY = "mysecretkey"

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 60


def hash_password(password):

    return hashlib.sha256(
        password.encode()
    ).hexdigest()


def verify_password(
    plain_password,
    hashed_password
):

    return hash_password(
        plain_password
    ) == hashed_password


def create_access_token(data: dict):

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt