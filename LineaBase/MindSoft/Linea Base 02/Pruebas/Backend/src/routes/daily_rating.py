from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..schemas.daily_rating import DailyRatingCreate
from ..services.database import get_db
from ..utils.jwt_util import get_current_user
from ..schemas.user import UserToJwt
from ..controllers.daily_rating import get_daily_rating, create_daily_rating

daily_rating_router = APIRouter()

@daily_rating_router.get("/user-daily_rating")
def get_user_daily_rating(db: Session = Depends(get_db), user: UserToJwt = Depends(get_current_user)):
    response = get_daily_rating(db, user)
    return response

@daily_rating_router.post("/user-daily_rating")
def create_user_daily_rating(daily_rating: DailyRatingCreate, db: Session = Depends(get_db), user: UserToJwt = Depends(get_current_user)):
    response = create_daily_rating(daily_rating, db,user)
    return response
