from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..schemas.stat import MonthStats
from ..services.database import get_db
from ..utils.jwt_util import get_current_user
from ..schemas.user import UserToJwt
from ..controllers.stat import get_rating_days, get_rating_days_by_month, get_moods_stats, get_moods_stats_by_month

stat_router = APIRouter()
@stat_router.get("/stats-by-month")
def get_stats_by_month(month_stats: MonthStats, db: Session = Depends(get_db), user: UserToJwt = Depends(get_current_user)):
    moods = get_moods_stats_by_month(db, user, month_stats)
    rating = get_rating_days_by_month(db, user, month_stats)
    response = {"moods_stats": moods, "rating_stats": rating}
    return response


@stat_router.get("/stats")
def get_stats(db: Session = Depends(get_db), user: UserToJwt = Depends(get_current_user)):
    moods = get_moods_stats(db, user)
    rating = get_rating_days(db, user)
    response = {"moods_stats": moods, "rating_stats": rating}
    return response


