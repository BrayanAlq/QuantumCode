from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..schemas.mood_rating import MoodRatingCreate
from ..schemas.user import UserToJwt
from ..services.database import get_db
from ..utils.jwt_util import get_current_user

from ..controllers.mood_rating import create_mood_rating

mood_rating_router = APIRouter()

@mood_rating_router.post("/mood-rating")
async def create_user_mood_rating(mood_rating: MoodRatingCreate, db: Session = Depends(get_db), user: UserToJwt = Depends(get_current_user)):
  response = await create_mood_rating(mood_rating, db, user)
  return response