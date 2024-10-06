from fastapi import FastAPI, Depends, HTTPException
from ..models import DaylyRating

from ..services.database import get_db
from ..schemas.daily_rating import DailyRatingCreate, DailyRatingResponse
from ..schemas.user import UserToJwt
from sqlalchemy.orm import Session

from ..utils.jwt_util import get_current_user

def get_daily_rating(db: Session , user: UserToJwt):
    daily_rating = db.query(DailyRatingResponse).filter(DailyRatingResponse.user_id == user.id).first()
    if not daily_rating:
        raise HTTPException(status_code=404, detail="Daily rating not found")
    return daily_rating

def create_daily_rating(daily_rating: DailyRatingCreate, db: Session):
    db_daily_rating = DailyRatingCreate
    db.add(db_daily_rating)
    db.commit()
    db.refresh(db_daily_rating)
    return db_daily_rating
