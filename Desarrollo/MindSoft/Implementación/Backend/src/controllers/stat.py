from sqlalchemy import extract, func
from sqlalchemy.orm import Session
from fastapi import HTTPException
from ..schemas.stat import MonthStats
from ..models import DailyRating, MoodRating, MoodRatingDetail, Mood
from ..schemas.user import UserToJwt

def get_moods_stats_by_month(db: Session, user: UserToJwt, month_stats: MonthStats):
    month = month_stats.date.month
    year = month_stats.date.year
    
    month_stats = (
        db.query(Mood.mood, func.count(MoodRatingDetail.mood_rating_detail_id).label("total_mood_ratings"))
        .join(MoodRating, MoodRatingDetail.mood_rating_id == MoodRating.mood_rating_id)
        .join(Mood, MoodRatingDetail.mood_id == Mood.mood_id)
        .filter(MoodRating.user_id == user.user_id)
        .filter(extract('month', MoodRating.date) == month)
        .filter(extract('year', MoodRating.date) == year)
        .group_by(Mood.mood)
        .all()
    )
    if not month_stats:
        raise {"message": "No moods found"}
    
    month_stats_dict = [{"mood": mood, "total_mood_ratings": total} for mood, total in month_stats]

    return month_stats_dict

def get_moods_stats(db: Session, user: UserToJwt):
    all_stats = (
        db.query(Mood.mood, func.count(MoodRatingDetail.mood_rating_detail_id).label("total_mood_ratings"))
        .join(MoodRating, MoodRatingDetail.mood_rating_id == MoodRating.mood_rating_id)
        .join(Mood, MoodRatingDetail.mood_id == Mood.mood_id)
        .filter(MoodRating.user_id == user.user_id)
        .group_by(Mood.mood)
        .all()
    )
    if not all_stats:
        return {"message": "No moods found"}
    all_stats_dict = [{"mood": mood, "total_mood_ratings": total} for mood, total in all_stats]

    return all_stats_dict

def get_rating_days(db: Session, user: UserToJwt):
    result = (
        db.query(func.avg(DailyRating.rating).label("average_rating"))
        .filter(DailyRating.user_id == user.user_id)
        .first()
    )
    
    average_rating = result[0] if result and result[0] is not None else None

    if average_rating is None:
        raise {"message": "No ratings found"}

    return {"average_rating": float(average_rating)}

def get_rating_days_by_month(db: Session, user: UserToJwt, month_stats: MonthStats):
    month = month_stats.date.month
    year = month_stats.date.year
    result = (
        db.query(func.avg(DailyRating.rating).label("average_rating"))
        .filter(DailyRating.user_id == user.user_id)
        .filter(extract('month', DailyRating.date) == month)
        .filter(extract('year', DailyRating.date) == year)
        .first()
    )
    average_rating = result[0] if result and result[0] is not None else None
    
    if not average_rating:
        return {"message": "No ratings found"}
    
    return average_rating