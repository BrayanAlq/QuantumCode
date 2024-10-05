from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.declarative import declarative_base
from dotenv import load_dotenv

import os

load_dotenv(dotenv_path='.env')

user = os.getenv("DB_USER")
password = os.getenv("DB_PASSWORD")
host = os.getenv("DB_HOST")
database = os.getenv("DB_NAME")

SQL_ALCHEMY_DATABASE_URL = f"mysql+asyncmy://{user}:{password}@{host}:3306/{database}"

engine = create_async_engine(SQL_ALCHEMY_DATABASE_URL, echo=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

async def create_tables():
  async with engine.begin() as conn:
    from ..models import DaylyRating, Goal, GratitudeJournal, Journal, MoodRating, Mood, User, MoodRatingDetail
    await conn.run_sync(Base.metadata.create_all)

async def get_db():
  async with SessionLocal() as session:
    yield session
    
