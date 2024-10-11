from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session


from ..models import Goal
from ..schemas.user import UserToJwt
from ..schemas.goal import GoalCreate, GoalResponse, GoalUpdate, GoalUpdateStatus


def get_active_goal(db: Session, user: UserToJwt):
    active_goals_user = db.query(Goal).filter(Goal.user_id == user.user_id).filter(Goal.status == 0).all()
    if not active_goals_user:
        return {"message":"This user doesn't have any active goal"}
    return active_goals_user

def create_goal(goal: GoalCreate, db: Session,user:UserToJwt):
    db_goal = Goal(
        goal_name=goal.goal_name,
        goal_user_id=user.user_id,
        goal_duration=goal.duration_days,
        goal_start_date=goal.start_date,
        status=0
    )    
    db.add(db_goal)
    db.commit()
    db.refresh(db_goal)
    return {"message":"Goal created successfully","goal":db_goal}

def update_goal(goal: GoalUpdate, db: Session,user:UserToJwt):
    db_goal = db.query(Goal).filter(Goal.goal_id == goal.goal_id).filter(Goal.user_id == user.user_id).first()
    if not db_goal:
        return {"message":"Goal not found to update"}
    db_goal.goal_name = goal.goal_name
    db_goal.goal_duration = goal.duration_days
    db.commit()
    db.refresh(db_goal)
    return {"message":"Goal updated successfully","goal":db_goal}

def complete_goal(goal: GoalUpdateStatus, db: Session,user:UserToJwt):
    db_goal = db.query(Goal).filter(Goal.goal_id == goal.goal_id).filter(Goal.user_id == user.user_id).first()
    if not db_goal:
        return {"message":"Goal not found to completed"}
    db_goal.status = 1
    db.commit()
    db.refresh(db_goal)
    return {"message":"Goal completed successfully","goal":db_goal}

def delete_goal(goal_id: int, db: Session,user:UserToJwt):
    db_goal = db.query(Goal).filter(Goal.goal_id == goal_id).filter(Goal.user_id == user.user_id).first()
    if not db_goal:
        return {"message":"Goal not found to delete"}
    db_goal.status = -1
    db.commit()
    db.refresh(db_goal)
    return {"message":"Goal deleted successfully"}