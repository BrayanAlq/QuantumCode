from sqlalchemy import extract, func
from sqlalchemy.orm import Session
from fastapi import HTTPException
from ..schemas.stat import WeekStats
from ..models import DailyRating, MoodRating, MoodRatingDetail, Mood
from ..schemas.user import UserToJwt

def get_moods_stats_by_week(db: Session, user: UserToJwt, week_stats: WeekStats):
    week = week_stats.date.isocalendar().week
    year = week_stats.date.year

    week_stats = (
        db.query(Mood.mood, func.count(MoodRatingDetail.mood_rating_detail_id).label("total_mood_ratings"))
        .join(MoodRating, MoodRatingDetail.mood_rating_id == MoodRating.mood_rating_id)
        .join(Mood, MoodRatingDetail.mood_id == Mood.mood_id)
        .filter(MoodRating.user_id == user.user_id)
        .filter(extract('week', MoodRating.date) == week)
        .filter(extract('year', MoodRating.date) == year)
        .group_by(Mood.mood)
        .all()
    )
    
    if not week_stats:
        return {"message": "No moods found for this week"}
    
    week_stats_dict = [{"mood": mood, "total_mood_ratings": total} for mood, total in week_stats]

    return week_stats_dict

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

def get_rating_days_by_week(db: Session, user: UserToJwt, week_stats: WeekStats):
    week = week_stats.date.isocalendar().week
    year = week_stats.date.year
    
    result = (
        db.query(func.avg(DailyRating.rating).label("average_rating"))
        .filter(DailyRating.user_id == user.user_id)
        .filter(extract('week', DailyRating.date) == week)
        .filter(extract('year', DailyRating.date) == year)
        .first()
    )
    
    average_rating = result[0] if result and result[0] is not None else None

    if not average_rating:
        return {"message": "No ratings found for this week"}

    return {"average_rating": average_rating}