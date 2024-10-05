from sqlalchemy.orm import Session
from fastapi import HTTPException

from ..schemas.user import UserCreate, UserLogin, UserToJwt
from ..models import User

from ..utils.bcrypt import hash_password, verify_password
from ..utils.jwt_util import create_access_token

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

async def login_user(user: UserLogin, db: Session):
  user_in_db = db.query(User).filter(User.username == user.username).first()

  if user_in_db is None:
    raise HTTPException(status_code=404, detail="username not found")

  if not verify_password(user.password, user_in_db.password):
    raise HTTPException(status_code=401, detail="invalid password")

  jwtoken = create_access_token(UserToJwt(
    username=user_in_db.username,
    user_id=user_in_db.user_id,
    first_name=user_in_db.first_name,
    last_name=user_in_db.last_name
  ))

  return { "jwt": jwtoken }
