from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..schemas.user import UserToJwt
from ..utils.jwt_util import get_current_user
from ..services.database import get_db
from ..controllers.user import user_info

user_router = APIRouter()

@user_router.get("/user-info")
async def get_user_info(current_user: UserToJwt = Depends(get_current_user), db: Session = Depends(get_db)):
  response = await user_info(current_user, db)
  return response
