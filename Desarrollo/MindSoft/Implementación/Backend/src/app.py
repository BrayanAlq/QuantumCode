from fastapi import FastAPI, Depends
from typing import Optional

from .services.database import create_tables, initalize_db_moods

from .utils.jwt_util import get_current_user
from .models import User
from .routes.login import login_router
from .routes.daily_rating import daily_rating_router
from .routes.goal import goal_router
from .routes.stat import stat_router
from .routes.mood_rating import mood_rating_router
from .routes.mood import mood_router
from .routes.journal import journal_router
from .routes.recomendations import recomendations_router

app = FastAPI()

app.include_router(login_router)
app.include_router(daily_rating_router)
app.include_router(goal_router)
app.include_router(stat_router)
app.include_router(mood_router)
app.include_router(mood_rating_router)
app.include_router(journal_router)
app.include_router(recomendations_router)

@app.on_event("startup")
def startup():
  create_tables()
  initalize_db_moods()

@app.get("/helloworld")
async def hello_world():
  return { "message": "Hello World" }

@app.get("/protected")
async def protected(current_user: Optional[User] = Depends(get_current_user)):
  return { "message": "access granted", "data": current_user }
