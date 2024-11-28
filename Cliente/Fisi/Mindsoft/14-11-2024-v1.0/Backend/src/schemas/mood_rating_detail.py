from pydantic import BaseModel

class MoodRatingDetailCreate(BaseModel):
  mood_id: int