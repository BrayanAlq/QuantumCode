from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..schemas.user import UserToJwt
from ..services.database import get_db
from ..utils.jwt_util import get_current_user
from ..controllers.recomendations import get_recomendations

recomendations_router = APIRouter()

@recomendations_router.get("/recomendations")
async def get_user_recomendations(db: Session = Depends(get_db), user: UserToJwt = Depends(get_current_user)):
  response = await get_recomendations(db, user)
  return response