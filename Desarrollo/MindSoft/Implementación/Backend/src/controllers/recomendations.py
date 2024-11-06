from sqlalchemy.orm import Session, joinedload
from sqlalchemy.inspection import inspect
import datetime

from ..services.ai import ask_ai
from ..schemas.user import UserToJwt
from ..models import Journal, Mood, MoodRatingDetail, MoodRating, DailyRating

def object_as_serialized_dict(obj):
  """Convierte un objeto SQLAlchemy en un diccionario serializado."""
  return {
    c.key: (
      getattr(obj, c.key).isoformat() if isinstance(getattr(obj, c.key), datetime.date) else getattr(obj, c.key)
    )
    for c in inspect(obj).mapper.column_attrs
  }

def serialize_list(objects):
  """Convierte una lista de objetos SQLAlchemy en una lista de diccionarios serializados."""
  return [object_as_serialized_dict(obj) for obj in objects]

async def get_recomendations(db: Session, user: UserToJwt):
  date_now = datetime.date.today()
  one_week_ago = date_now - datetime.timedelta(days=7)

  week_journals = db.query(
    Journal
  ).filter(
    Journal.user_id == user.user_id,
    Journal.date.between(one_week_ago, date_now)
  ).all()

  week_moods = db.query(MoodRating).join(
    MoodRatingDetail, MoodRating.mood_rating_id == MoodRatingDetail.mood_rating_id
  ).join(
    Mood, MoodRatingDetail.mood_id == Mood.mood_id
  ).options(
    joinedload(MoodRating.mood_rating_details).joinedload(MoodRatingDetail.mood)
  ).filter(
    MoodRating.user_id == user.user_id,
    MoodRating.date.between(one_week_ago, date_now)
  ).all()

  week_daily_ratings = db.query(
    DailyRating
  ).filter(
    DailyRating.user_id == user.user_id,
    DailyRating.date.between(one_week_ago, date_now)
  ).all()

  week_journals_serialized = serialize_list(week_journals)
  week_moods_serialized = serialize_list(week_moods)
  week_daily_ratings_serialized = serialize_list(week_daily_ratings)

  payload = {
    "week_journals": week_journals_serialized,
    "week_moods": week_moods_serialized,
    "week_daily_ratings": week_daily_ratings_serialized
  }

  response = ask_ai(user_message=payload, instructions="")
  return { "response": response }