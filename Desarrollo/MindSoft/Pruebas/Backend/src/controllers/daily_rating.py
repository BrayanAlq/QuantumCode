from fastapi import FastAPI, Depends, HTTPException
from ..models import DailyRating

from ..services.database import get_db
from ..models import DailyRating, User
from ..schemas.daily_rating import DailyRatingCreate, DailyRatingResponse
from ..schemas.user import UserToJwt
from sqlalchemy.orm import Session

from ..utils.jwt_util import get_current_user

def get_daily_rating(db: Session , user: UserToJwt):
    daily_rating = db.query(DailyRating).filter(DailyRating.user_id == user.user_id).all()
    if not daily_rating:
        raise HTTPException(status_code=404, detail="Daily rating not found")
    return daily_rating

def create_daily_rating(daily_rating: DailyRatingCreate, db: Session,user:UserToJwt):
    if daily_rating.rating>5 or daily_rating.rating<1:
        raise HTTPException(status_code=400, detail="Rating must be between 1 and 5")
    db_daily_rating = DailyRating(
        user_id=user.user_id,
        rating=daily_rating.rating,
        date=daily_rating.date
    )
    db.add(db_daily_rating)
    db.commit()
    db.refresh(db_daily_rating)
    return db_daily_rating
