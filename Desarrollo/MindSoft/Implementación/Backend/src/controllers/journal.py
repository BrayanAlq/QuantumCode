from sqlalchemy.orm import Session
from fastapi import HTTPException
from collections import defaultdict

from ..models import Journal
from ..schemas.user import UserToJwt
from ..schemas.journal import JournalCreateDTO

spanish_months = {
  "january": "enero",
  "february": "febrero",
  "march": "marzo",
  "april": "abril",
  "may": "mayo",
  "june": "junio",
  "july": "julio",
  "august": "agosto",
  "september": "septiembre",
  "october": "octubre",
  "november": "noviembre",
  "december": "diciembre"
}

async def create_journal(journal: JournalCreateDTO, db: Session, user: UserToJwt):
  new_journal = Journal(description=journal.description, date=journal.date.strftime("%Y-%m-%d"), user_id=user.user_id)
  db.add(new_journal)
  db.commit()
  db.refresh(new_journal)
  db.close()
  return { "message": "journal created successfully", "journal": new_journal }

async def get_journal(db: Session, user: UserToJwt):
  journals = db.query(Journal).filter(Journal.user_id == user.user_id).all()
  if not journals:
    raise HTTPException(status_code=404, detail="Todavía no has creado ningún diario")
  
  journal_by_months = defaultdict(list)
  for journal in journals:
    month_string = spanish_months[journal.date.strftime("%B").lower()]
    year = journal.date.strftime("%Y")
    date_string = f"{month_string} {year}"
    journal_by_months[date_string].append(journal)

  journals_list = [
    {
      "date": date_string,
      "journals": journals_list
    }
    for date_string, journals_list in journal_by_months.items()
  ]

  db.close()
  return journals_list