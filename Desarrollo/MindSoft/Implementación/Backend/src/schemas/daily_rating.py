from pydantic import BaseModel
from datetime import date

class DailyRatingCreate(BaseModel):
    rating: int
    date: date
    
class DailyRatingResponse(BaseModel):
    daily_rating_id: int
    rating: int
    date: date
    user_id: int