from pydantic import BaseModel
from datetime import date

class MouthStats(BaseModel):
    id_user: int
    date: date
    
class AllStats(BaseModel):
    id_user: int
    