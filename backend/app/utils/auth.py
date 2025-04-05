from datetime import datetime, timedelta, UTC
from jose import jwt, JWTError

# ⚠️ For hackathon use only — do NOT hardcode in production!
SECRET_KEY = "supersecret"
ALGORITHM = "HS256"

def create_token(data: dict):
    """
    Create a JWT access token with 6-hour expiration.
    """
    to_encode = data.copy()
    expire = datetime.now(UTC) + timedelta(hours=6)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_token(token: str):
    """
    Decode a JWT token and return its payload.
    Returns None if decoding fails.
    """
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        return None
