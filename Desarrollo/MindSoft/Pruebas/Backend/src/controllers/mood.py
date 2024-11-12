from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session

from ..models.mood import Mood
from ..schemas.user import UserToJwt
from ..schemas.mood import MoodGetDTO
from ..utils.jwt_util import get_current_user

async def get_moods(db: Session, dto: MoodGetDTO, user: UserToJwt = Depends(get_current_user)):
  moods = db.query(Mood).offset(dto.offset).limit(dto.limit).all()
  if not moods:
    raise HTTPException(status_code=404, detail="Moods not found")
  return moods