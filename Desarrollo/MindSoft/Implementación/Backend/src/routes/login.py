from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..schemas.user import UserCreate
from ..services.database import get_db
from ..controllers.login import register_user

from ..utils.bcrypt import hash_password

login_router = APIRouter()

@login_router.post("/signup")
async def signup(user: UserCreate, db: Session = Depends(get_db)):
  response = await register_user(user, db)
  return response