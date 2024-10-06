from fastapi import FastAPI, Depends
from typing import Optional

from .services.database import create_tables

from .utils.jwt_util import get_current_user
from .models import User
from .routes.login import login_router
from .routes.daily_rating import daily_rating_router

app = FastAPI()

app.include_router(login_router)
app.include_router(daily_rating_router)

@app.on_event("startup")
def startup():
  create_tables()

@app.get("/helloworld")
async def hello_world():
  return { "message": "Hello World" }

@app.get("/protected")
async def protected(current_user: Optional[User] = Depends(get_current_user)):
  return { "message": "access granted", "data": current_user }
