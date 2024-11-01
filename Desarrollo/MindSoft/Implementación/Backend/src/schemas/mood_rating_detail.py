from pydantic import BaseModel

class MoodRatingDetailCreate(BaseModel):
  id_mood: int