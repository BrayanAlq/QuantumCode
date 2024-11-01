from fastapi import HTTPException
from sqlalchemy.orm import Session

from ..models import MoodRating, MoodRatingDetail
from ..schemas.mood_rating import MoodRatingCreate
from ..schemas.user import UserToJwt

async def create_mood_rating(mood_rating: MoodRatingCreate, db: Session, user: UserToJwt):
  new_mood_rating = MoodRating(date=mood_rating.date, user_id=user.user_id)
  db.add(new_mood_rating)
  db.commit()
  db.refresh(new_mood_rating)
  for mood_detail in mood_rating.mood_detail:
    new_mood_rating_detail = MoodRatingDetail(id_mood=mood_detail.id_mood, mood_rating_id=new_mood_rating.mood_rating_id)
    db.add(new_mood_rating_detail)
    db.commit()
    db.refresh(new_mood_rating_detail)
  return { "message": "Estados de ánimo guardados correctamente" }