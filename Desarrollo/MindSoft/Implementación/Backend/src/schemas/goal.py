from pydantic import BaseModel
from datetime import date

class GoalCreate(BaseModel):
    goal_name: str
    duration_days: int
    start_date: date
    
class GoalUpdate(BaseModel):
    goal_id: int
    
class GoalResponse(BaseModel):
    goal_id: int
    goal_name: str
    duration_days: int
    start_date: date
    status: int
    
class GoalDelete(BaseModel):
    goal_id: int
    
    
    
    