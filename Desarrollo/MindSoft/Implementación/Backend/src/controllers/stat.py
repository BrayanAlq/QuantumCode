from sqlalchemy import extract, func
from sqlalchemy.orm import Session
from fastapi import HTTPException
from ..schemas.stat import MonthStats, AllStats
from ..models import DailyRating, MoodRating, MoodRatingDetail, Mood
from ..schemas.user import UserToJwt

def get_moods_stats_by_month(db: Session, user: UserToJwt, month_stats: MonthStats):
    month = month_stats.date.month
    year = month_stats.date.year
    
    mouth_stats = (
        db.query(Mood.mood, func.count(MoodRatingDetail.id).label("total_mood_ratings"))
        .join(MoodRating, MoodRatingDetail.mood_rating_id == MoodRating.mood_rating_id)
        .join(Mood, MoodRatingDetail.mood_id == Mood.mood_id)
        .filter(MoodRating.user_id == user.user_id)
        .filter(extract('month', MoodRating.date) == month)
        .filter(extract('year', MoodRating.date) == year)
        .group_by(Mood.mood)
        .all()
    )
    if not mouth_stats:
        raise HTTPException(status_code=404, detail="Month stats not found")
    return mouth_stats

def get_moods_stats(db: Session, user: UserToJwt):
    all_stats = (
        db.query(Mood.mood, func.count(MoodRatingDetail.id).label("total_mood_ratings"))
        .join(MoodRating, MoodRatingDetail.mood_rating_id == MoodRating.mood_rating_id)
        .join(Mood, MoodRatingDetail.mood_id == Mood.mood_id)
        .filter(MoodRating.user_id == user.user_id)
        .group_by(Mood.mood)
        .all()
    )
    if not all_stats:
        raise HTTPException(status_code=404, detail="All stats not found")
    return all_stats

def get_rating_days(db: Session, user: UserToJwt):
    average_ratings = (
        db.query(func.avg(DailyRating.rating).label("average_rating"))
        .filter(DailyRating.user_id == user.user_id)
        .first()
    )
    if not average_ratings:
        raise HTTPException(status_code=404, detail="Rating days not found")
    return average_ratings

def get_rating_days_by_month(db: Session, user: UserToJwt, month_stats: MonthStats):
    month = month_stats.date.month
    year = month_stats.date.year
    average_ratings = (
        db.query(func.avg(DailyRating.rating).label("average_rating"))
        .filter(DailyRating.user_id == user.user_id)
        .filter(extract('month', DailyRating.date) == month)
        .filter(extract('year', DailyRating.date) == year)
        .first()
    )
    if not average_ratings:
        raise HTTPException(status_code=404, detail="Rating days not found")
    return average_ratings