from pydantic import BaseModel
from datetime import date

class WeekStats(BaseModel):
    date: date