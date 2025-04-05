from fastapi import APIRouter, HTTPException, Depends, Request
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from motor.motor_asyncio import AsyncIOMotorClient
from app.utils.auth import create_token, decode_token

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# MongoDB setup (local)
client = AsyncIOMotorClient("mongodb://localhost:27017")
db = client.playlocal

@router.post("/register")
async def register(data: dict):
    if not all(k in data for k in ("email", "password", "role")):
        raise HTTPException(status_code=400, detail="Missing required fields")

    existing = await db.users.find_one({"email": data["email"]})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    await db.users.insert_one(data)
    return {"message": "User registered"}

@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await db.users.find_one({"email": form_data.username})
    if not user or user["password"] != form_data.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token({"email": user["email"], "role": user["role"]})
    return {"access_token": token, "token_type": "bearer"}

@router.get("/me")
async def get_me(token: str = Depends(oauth2_scheme)):
    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    return payload
