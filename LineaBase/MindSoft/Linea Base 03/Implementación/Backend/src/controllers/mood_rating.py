from fastapi import HTTPException
from sqlalchemy.orm import Session, joinedload

from ..models import MoodRating, MoodRatingDetail, Mood
from ..schemas.mood_rating import MoodRatingCreate, CheckMoodRating
from ..schemas.user import UserToJwt

from datetime import datetime

async def create_mood_rating(mood_rating: MoodRatingCreate, db: Session, user: UserToJwt):
  new_mood_rating = MoodRating(date=mood_rating.date, user_id=user.user_id)
  db.add(new_mood_rating)
  db.commit()
  db.refresh(new_mood_rating)
  for mood_detail in mood_rating.mood_detail:
    new_mood_rating_detail = MoodRatingDetail(mood_id=mood_detail.mood_id, mood_rating_id=new_mood_rating.mood_rating_id)
    db.add(new_mood_rating_detail)
    db.commit()
    db.refresh(new_mood_rating_detail)
  return { "message": "Estados de ánimo guardados correctamente" }

async def check_mood_rating(check_mood_rating: CheckMoodRating,db: Session, user: UserToJwt):
  count_ratings_today = db.query(MoodRating).filter(MoodRating.date == check_mood_rating.date, MoodRating.user_id == user.user_id).count()
  if count_ratings_today > 0:
    raise HTTPException(status_code=403, detail={
      "status": "forbidden",
      "message": "You already rated your moods today"
    })
  
  return { "status": "allowed", "message": "You can rate your moods" }

async def get_mood_ratings(db: Session, user: UserToJwt):
  mood_ratings = db.query(MoodRating).join(
    MoodRatingDetail, MoodRating.mood_rating_id == MoodRatingDetail.mood_rating_id
  ).join(
    Mood, MoodRatingDetail.mood_id == Mood.mood_id
  ).options(
    joinedload(MoodRating.mood_rating_details).joinedload(MoodRatingDetail.mood)
  ).filter(
    MoodRating.user_id == user.user_id
  ).all()
  
  if not mood_ratings:
    raise HTTPException(status_code=404, detail="Mood ratings not found")
  return mood_ratings
