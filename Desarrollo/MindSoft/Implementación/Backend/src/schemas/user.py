from pydantic import BaseModel

class UserCreate(BaseModel):
  username: str
  password: str
  first_name: str
  last_name: str
  average: float
  faculty: str
  address: str

class UserLogin(BaseModel):
  username: str
  password: str

class UserToJwt(BaseModel):
  username: str
  user_id: int
  first_name: str
  last_name: str