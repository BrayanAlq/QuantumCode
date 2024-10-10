from sqlalchemy import Column, Integer, Text, Date, ForeignKey
from sqlalchemy.orm import relationship

from ..services.database import Base

class Goal(Base):
  __tablename__ = "goal"

  goal_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
  goal_name = Column(Text, nullable=False)
  duration_days = Column(Integer)
  start_date = Column(Date)
  status = Column(Integer)
  user_id = Column(Integer, ForeignKey("user.user_id"), nullable=False)

  user = relationship("User", back_populates="goals")