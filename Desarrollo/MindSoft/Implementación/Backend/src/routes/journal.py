from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..schemas.journal import JournalCreateDTO
from ..services.database import get_db
from ..utils.jwt_util import get_current_user
from ..schemas.user import UserToJwt
from ..controllers.journal import create_journal, get_journal

journal_router = APIRouter()

@journal_router.post("/journal")
async def create_user_journal(journal: JournalCreateDTO, db: Session = Depends(get_db), user: UserToJwt = Depends(get_current_user)):
  response = await create_journal(journal, db, user)
  return response

@journal_router.get("/journal")
async def get_user_journal(db: Session = Depends(get_db), user: UserToJwt = Depends(get_current_user)):
  response = await get_journal(db, user)
  return response