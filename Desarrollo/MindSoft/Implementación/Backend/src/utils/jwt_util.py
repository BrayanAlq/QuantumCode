from fastapi import HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer
from dotenv import load_dotenv
from jose import JWTError, jwt
from datetime import datetime, timedelta
import os
from sqlalchemy.orm import Session
from typing import Optional

from ..models import User
from ..schemas.user import UserToJwt
from ..services.database import get_db

load_dotenv(dotenv_path='.env')

SECRET_KEY = os.getenv("SECRET_KEY")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def create_access_token(data: UserToJwt, expires_delta: int = None):
  to_encode = data.dict()
  if expires_delta:
    expire = datetime.utcnow() + timedelta(seconds=expires_delta)
  else:
    expire = datetime.utcnow() + timedelta(minutes=15)
  
  to_encode.update({
    "exp": expire,
    "sub": data.username,
    "fullname": f"{data.first_name} {data.last_name}"
  })
  encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm='HS256')
  return encoded_jwt

def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)) -> Optional[User]:
  credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
  )
  try:
    payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    username: str = payload.get('sub')
    if username is None:
      raise credentials_exception
  except JWTError:
    raise credentials_exception

  user = db.query(User).filter(User.username == username).first()
  return user
