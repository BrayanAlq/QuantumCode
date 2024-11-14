from fastapi import HTTPException
from sqlalchemy.orm import Session

from ..schemas.user import UserToJwt
from ..models.user import User

async def user_info(current_user: UserToJwt, db: Session):
  user = db.query(User).filter(User.user_id == current_user.user_id).first()
  if not user:
    raise HTTPException(status_code=404, detail="User not found")
  
  # delete password field from response
  del user.password
  
  return user