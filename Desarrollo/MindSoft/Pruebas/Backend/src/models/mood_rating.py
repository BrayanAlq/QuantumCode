from sqlalchemy import Column, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship

from ..services.database import Base

class MoodRating(Base):
  __tablename__ = "mood_rating"

  mood_rating_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
  date = Column(Date, nullable=False)
  user_id = Column(Integer, ForeignKey("user.user_id"), nullable=False)

  user = relationship("User", back_populates="mood_ratings")

  mood_rating_details = relationship("MoodRatingDetail", back_populates="mood_rating")