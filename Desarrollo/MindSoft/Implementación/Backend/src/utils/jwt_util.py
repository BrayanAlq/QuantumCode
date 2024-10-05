from fastapi import HTTPException, status
from dotenv import load_dotenv
from jose import JWTError, jwt
from datetime import datetime, timedelta
import os

from ..schemas.user import UserToJwt

load_dotenv(dotenv_path='.env')

SECRET_KEY = os.getenv("SECRET_KEY")

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

def verify_jwt(token: str):
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
    return payload
  except JWTError:
    raise credentials_exception
