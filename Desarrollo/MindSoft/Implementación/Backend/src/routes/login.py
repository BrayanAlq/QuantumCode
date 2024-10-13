from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..schemas.user import UserCreate, UserLogin
from ..services.database import get_db
from ..controllers.login import register_user, login_user

from ..models import User
from ..utils.jwt_util import get_current_user, oauth2_scheme, check_token

login_router = APIRouter()

@login_router.post("/signup")
async def signup(user: UserCreate, db: Session = Depends(get_db)):
  response = await register_user(user, db)
  return response

@login_router.post("/login")
async def login(user: UserLogin, db: Session = Depends(get_db)):
  response = await login_user(user, db)
  return response

@login_router.get("/verify-token")
async def verify_token(token: str = Depends(oauth2_scheme)):
  response = check_token(token)
  return response