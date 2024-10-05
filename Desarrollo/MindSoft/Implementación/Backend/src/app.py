from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from typing import Annotated

from .services.database import create_tables

app = FastAPI()

@app.on_event("startup")
async def startup():
  await create_tables()

@app.get("/helloworld")
async def hello_world():
  db = get_db()
  return { "message": "Hello World" }
