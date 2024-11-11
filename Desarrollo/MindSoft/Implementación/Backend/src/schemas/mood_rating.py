from pydantic import BaseModel
from datetime import date

from .mood_rating_detail import MoodRatingDetailCreate

class MoodRatingCreate(BaseModel):
  date: date
  mood_detail: list[MoodRatingDetailCreate]
  
class CheckMoodRating(BaseModel):
  date: date