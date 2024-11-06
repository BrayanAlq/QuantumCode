from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..schemas.stat import WeekStats
from ..services.database import get_db
from ..utils.jwt_util import get_current_user
from ..schemas.user import UserToJwt
from ..controllers.stat import get_rating_days, get_rating_days_by_week, get_moods_stats, get_moods_stats_by_week

stat_router = APIRouter()
@stat_router.get("/stats-rating")
def get_stats_rating(week_stats: WeekStats, db: Session = Depends(get_db), user: UserToJwt = Depends(get_current_user)):
    rating_week = get_rating_days_by_week(db, user, week_stats)
    rating_all = get_rating_days(db, user)
    if not rating_week and not rating_all:
        raise HTTPException(status_code=404, detail="No ratings stats found")
    response = {"rating_week": rating_week, "rating_all": rating_all}
    return response


@stat_router.get("/stats-moods")
def get_stats_moods(week_stats: WeekStats,db: Session = Depends(get_db), user: UserToJwt = Depends(get_current_user)):
    moods_week = get_moods_stats_by_week(db, user, week_stats)
    moods_all = get_moods_stats(db, user)    
    if not moods_week and not moods_all:
        raise HTTPException(status_code=404, detail="No moods stats found")
    response = {"moods_all": moods_all, "moods_week": moods_week}
    return response


