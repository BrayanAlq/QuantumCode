from pydantic import BaseModel

class MoodGetDTO(BaseModel):
  offset: int
  limit: int