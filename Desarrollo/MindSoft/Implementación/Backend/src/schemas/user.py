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