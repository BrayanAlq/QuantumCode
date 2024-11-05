from pydantic import BaseModel
from datetime import date

class MonthStats(BaseModel):
    date: date