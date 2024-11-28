from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from ..services.database import Base

class Mood(Base):
  __tablename__ = "mood"

  mood_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
  mood = Column(String(20), nullable=False)

  mood_rating_details = relationship("MoodRatingDetail", back_populates="mood")