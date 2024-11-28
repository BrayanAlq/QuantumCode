from sqlalchemy import Column, Integer, Date, ForeignKey, Text
from sqlalchemy.orm import relationship

from ..services.database import Base

class Journal(Base):
  __tablename__ = "journal"

  journal_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
  description = Column(Text, nullable=False)
  date = Column(Date, nullable=False)
  user_id = Column(Integer, ForeignKey("user.user_id"), nullable=False)

  user = relationship("User", back_populates="journals")