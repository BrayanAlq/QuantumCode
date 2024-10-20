from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..schemas.goal import GoalCreate, GoalUpdate, GoalUpdateStatus
from ..services.database import get_db
from ..controllers.goal import create_goal, update_goal, get_active_goal, complete_goal, delete_goal, get_complete_goal
from ..schemas.user import UserToJwt
from ..utils.jwt_util import get_current_user

goal_router = APIRouter()

@goal_router.get("/goal-active")
def get_user_goals(db: Session = Depends(get_db), user: UserToJwt = Depends(get_current_user)):
    response = get_active_goal(db, user)
    return response

@goal_router.get("/goal-complete")
def get_user_complete_goals(db: Session = Depends(get_db), user: UserToJwt = Depends(get_current_user)):
    response = get_complete_goal(db, user)
    return response

@goal_router.post("/goal-create")
def create_goal_user(goal: GoalCreate, db: Session = Depends(get_db), user: UserToJwt = Depends(get_current_user)):
    response = create_goal(goal, db, user)
    return response

@goal_router.put("/goal-update")
def update_goal_user(goal: GoalUpdate, db: Session = Depends(get_db), user: UserToJwt = Depends(get_current_user)):
    response = update_goal(goal, db, user)
    return response

@goal_router.put("/goal-complete")
def complete_goal_user(goal: GoalUpdateStatus, db: Session = Depends(get_db), user: UserToJwt = Depends(get_current_user)):
    response = complete_goal(goal, db, user)
    return response

@goal_router.delete("/goal-delete")
def delete_goal_user(goal: GoalUpdateStatus, db: Session = Depends(get_db), user: UserToJwt = Depends(get_current_user)):
    response = delete_goal(goal, db, user)
    return response
