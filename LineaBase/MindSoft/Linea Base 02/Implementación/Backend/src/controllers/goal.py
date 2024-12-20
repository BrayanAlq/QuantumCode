from sqlalchemy.orm import Session


from ..models import Goal
from ..schemas.user import UserToJwt
from ..schemas.goal import GoalCreate, GoalUpdate, GoalUpdateStatus


def get_active_goal(db: Session, user: UserToJwt):
    active_goals_user = db.query(Goal).filter(Goal.user_id == user.user_id).filter(Goal.status == 0).all()
    if not active_goals_user:
        return {"message":"This user doesn't have any active goal"}
    return active_goals_user

def get_complete_goal(db: Session, user: UserToJwt):
    complete_goals_user = db.query(Goal).filter(Goal.user_id == user.user_id).filter(Goal.status == 1).all()
    if not complete_goals_user:
        return {"message":"This user doesn't have any completed goal"}
    return complete_goals_user
def create_goal(goal: GoalCreate, db: Session,user:UserToJwt):
    db_goal = Goal(
        goal_name=goal.goal_name,
        user_id=user.user_id,
        duration_days=goal.duration_days,
        start_date=goal.start_date,
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
    db_goal.duration_days = goal.duration_days
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

def delete_goal(goal: GoalUpdateStatus, db: Session,user:UserToJwt):
    db_goal = db.query(Goal).filter(Goal.goal_id == goal.goal_id).filter(Goal.user_id == user.user_id).first()
    if not db_goal:
        return {"message":"Goal not found to delete"}
    db_goal.status = -1
    db.commit()
    db.refresh(db_goal)
    return {"message":"Goal deleted successfully"}