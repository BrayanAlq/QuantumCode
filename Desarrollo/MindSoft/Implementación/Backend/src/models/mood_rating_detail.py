from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

from ..services.database import Base

class MoodRatingDetail(Base):
  __tablename__ = "mood_rating_detail"

  mood_rating_detail_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
  mood_rating_id = Column(Integer, ForeignKey("mood_rating.mood_rating_id"), nullable=False)
  mood_id = Column(Integer, ForeignKey("mood.mood_id"), nullable=False)

  mood_rating = relationship("MoodRating", back_populates="mood_rating_details")
  mood = relationship("Mood", back_populates="mood_rating_details")