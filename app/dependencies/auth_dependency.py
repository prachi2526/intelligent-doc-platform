from fastapi import Header, HTTPException
import jwt

SECRET_KEY = "mysecretkey"


def get_current_user(authorization: str = Header(None)):

    if authorization is None:
        raise HTTPException(
            status_code=401,
            detail="Not authenticated"
        )

    try:

        token = authorization.split(" ")[1]

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=["HS256"]
        )

        email = payload.get("sub")

        return email

    except Exception:

        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )