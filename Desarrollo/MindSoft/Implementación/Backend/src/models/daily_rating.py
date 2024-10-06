from sqlalchemy import Column, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship

from ..services.database import Base

class DailyRating(Base):
  __tablename__ = "daily_rating"

  daily_rating_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
  rating = Column(Integer, nullable=False)
  date = Column(Date, nullable=False)
  user_id = Column(Integer, ForeignKey("user.user_id"), nullable=False)

  user = relationship("User", back_populates="daily_ratings")

