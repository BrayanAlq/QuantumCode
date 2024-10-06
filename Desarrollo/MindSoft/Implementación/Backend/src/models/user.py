from sqlalchemy import Column, Integer, String, Double
from sqlalchemy.orm import relationship

from ..services.database import Base

class User(Base):
  __tablename__ = "user"

  user_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
  username = Column(String(30), nullable=False, unique=True)
  password = Column(String(80), nullable=False)
  first_name = Column(String(50))
  last_name = Column(String(50))
  average = Column(Double)
  faculty = Column(String(100))
  address = Column(String(100))

  daily_ratings = relationship("DailyRating", back_populates="user")
  goals = relationship("Goal", back_populates="user")
  journals = relationship("Journal", back_populates="user")
  gratitude_journals = relationship("GratitudeJournal", back_populates="user")
  mood_ratings = relationship("MoodRating", back_populates="user")
