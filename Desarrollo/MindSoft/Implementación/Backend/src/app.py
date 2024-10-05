from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from typing import Annotated

from .services.database import create_tables

from .routes.login import login_router

app = FastAPI()

app.include_router(login_router)

@app.on_event("startup")
def startup():
  create_tables()

@app.get("/helloworld")
async def hello_world():
  db = get_db()
  return { "message": "Hello World" }
