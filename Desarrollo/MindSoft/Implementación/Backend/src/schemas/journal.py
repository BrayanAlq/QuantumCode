from pydantic import BaseModel
from datetime import date

class JournalCreateDTO(BaseModel):
  description: str
  date: date