from sqlalchemy.orm import Session
from fastapi import HTTPException

from ..schemas.user import UserCreate
from ..models import User

from ..utils.bcrypt import hash_password, verify_password

async def register_user(user: UserCreate, db: Session):
  user_in_db = db.query(User).filter(User.username == user.username).first()

  if user_in_db:
    raise HTTPException(status_code=409, detail="username already exists")

  hash_pass = hash_password(user.password)

  new_user = User(
    username=user.username,
    password=hash_pass,
    first_name=user.first_name,
    last_name=user.last_name,
    average=user.average,
    faculty=user.faculty,
    address=user.address
  )

  db.add(new_user)
  db.commit()
  db.refresh(new_user)

  return { "message": "user created successfully" }