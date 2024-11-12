from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base, DeclarativeMeta
from dotenv import load_dotenv

import os

load_dotenv(dotenv_path='.env')

user = os.getenv("DB_USER")
password = os.getenv("DB_PASSWORD")
host = os.getenv("DB_HOST")
database = os.getenv("DB_NAME")

SQL_ALCHEMY_DATABASE_URL = f"mysql+pymysql://{user}:{password}@{host}:3306/{database}"

engine = create_engine(SQL_ALCHEMY_DATABASE_URL, echo=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base: DeclarativeMeta = declarative_base()

def create_tables():
  with engine.begin() as conn:
    from ..models import DailyRating, Goal, GratitudeJournal, Journal, MoodRating, Mood, User, MoodRatingDetail
    Base.metadata.create_all(conn)

def get_db():
  with SessionLocal() as session:
    yield session

def initalize_db_moods():
  with SessionLocal() as session:
    from ..models import Mood
    count = session.query(Mood).count()

    if count == 0:

      moods = [
        Mood(mood="Deprimido"),
        Mood(mood="Inseguro"),
        Mood(mood="Ansioso"),
        Mood(mood="Enojado"),
        Mood(mood="Exhausto"),
        Mood(mood="Eufórico"),
        Mood(mood="Aliviado"),
        Mood(mood="Sorprendido"),
        Mood(mood="Feliz")
      ]

      for mood in moods:
        session.add(mood)
      session.commit()

    