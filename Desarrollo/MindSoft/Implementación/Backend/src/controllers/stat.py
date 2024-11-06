from sqlalchemy import extract, func
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from fastapi import HTTPException
from ..schemas.stat import WeekStats
from ..models import DailyRating, MoodRating, MoodRatingDetail, Mood
from ..schemas.user import UserToJwt

def get_start_and_end_of_week(date: datetime):
    start_of_week = date - timedelta(days=date.weekday())
    end_of_week = start_of_week + timedelta(days=6)
    return start_of_week, end_of_week
def get_moods_stats_by_week(db: Session, user: UserToJwt, week_stats: WeekStats):
    date = week_stats.date
    start_of_week, end_of_week = get_start_and_end_of_week(date)
    week_stats = (
        db.query(Mood.mood, func.count(MoodRatingDetail.mood_rating_detail_id).label("total_mood_ratings"))
        .join(MoodRating, MoodRatingDetail.mood_rating_id == MoodRating.mood_rating_id)
        .join(Mood, MoodRatingDetail.mood_id == Mood.mood_id)
        .filter(MoodRating.user_id == user.user_id)
        .filter(MoodRating.date >= start_of_week, MoodRating.date <= end_of_week)
        .group_by(Mood.mood)
        .all()
    )
    
    if not week_stats :
        return {"message": "No moods found this week"}
    
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
    results = (
        db.query(
            func.date_format(DailyRating.date, "%M-%Y").label("month_year"),  
            func.avg(DailyRating.rating).label("average_rating") 
        )
        .filter(DailyRating.user_id == user.user_id)
        .group_by(func.date_format(DailyRating.date, "%M-%Y"))
        .all()
    )
    
    if not results:
        return {"message": "No ratings found"}

    monthly_ratings = [
        {
            "month_year": row.month_year,
            "average_rating": float(row.average_rating)
        }
        for row in results
    ]

    return monthly_ratings

def get_rating_days_by_week(db: Session, user: UserToJwt, week_stats: WeekStats):
    date = week_stats.date

    start_of_week, end_of_week = get_start_and_end_of_week(date)

    result = (
        db.query(func.avg(DailyRating.rating).label("average_rating"))
        .filter(DailyRating.user_id == user.user_id)
        .filter(DailyRating.date >= start_of_week, DailyRating.date <= end_of_week)
        .first()
    )

    average_rating = result[0] if result and result[0] is not None else None

    if average_rating is None:
        return {"message": "No ratings found for this week"}

    return {"average_rating": average_rating}