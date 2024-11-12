from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..controllers.mood import get_moods
from ..schemas.mood import MoodGetDTO
from ..schemas.user import UserToJwt
from ..utils.jwt_util import get_current_user
from ..services.database import get_db

mood_router = APIRouter()

@mood_router.get("/moods")
async def get_user_moods(offset: int = 0, limit: int = 10, db: Session = Depends(get_db), user: UserToJwt = Depends(get_current_user)):
  response = await get_moods(db, MoodGetDTO(offset=offset, limit=limit), user)
  return response