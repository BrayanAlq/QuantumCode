from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..schemas.mood_rating import MoodRatingCreate
from ..schemas.user import UserToJwt
from ..services.database import get_db
from ..utils.jwt_util import get_current_user

from ..controllers.mood_rating import create_mood_rating, check_mood_rating, get_mood_ratings

mood_rating_router = APIRouter()

@mood_rating_router.post("/mood-rating")
async def create_user_mood_rating(mood_rating: MoodRatingCreate, db: Session = Depends(get_db), user: UserToJwt = Depends(get_current_user)):
  response = await create_mood_rating(mood_rating, db, user)
  return response

@mood_rating_router.get("/check-daily-rating")
async def check_user_daily_rating(db: Session = Depends(get_db), user: UserToJwt = Depends(get_current_user)):
  response = await check_mood_rating(db, user)
  return response

@mood_rating_router.get("/mood-rating")
async def get_user_mood_ratings(db: Session = Depends(get_db), user: UserToJwt = Depends(get_current_user)):
  response = await get_mood_ratings(db, user)
  return response