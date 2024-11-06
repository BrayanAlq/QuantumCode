from sqlalchemy.orm import Session
from fastapi import HTTPException
from collections import defaultdict

from ..models import Journal
from ..schemas.user import UserToJwt
from ..schemas.journal import JournalCreateDTO
from ..utils.spanish_montsh import spanish_months, spanish_days

async def create_journal(journal: JournalCreateDTO, db: Session, user: UserToJwt):
  new_journal = Journal(description=journal.description, date=journal.date.strftime("%Y-%m-%d"), user_id=user.user_id)
  db.add(new_journal)
  db.commit()
  db.refresh(new_journal)
  month_string = spanish_months[journal.date.strftime("%B").lower()]
  year = journal.date.strftime("%Y")
  db.close()
  return {
    "message": "journal created successfully",
    "data": {
      "year": year, "month": month_string, "journal": new_journal
    }
  }

async def get_journal(db: Session, user: UserToJwt):
  journals = db.query(
    Journal
  ).filter(
    Journal.user_id == user.user_id
  ).order_by(
    Journal.date.asc()
  ).all()
  if not journals:
    raise HTTPException(status_code=404, detail="Todavía no has creado ningún diario")
  
  journal_by_years = defaultdict(lambda: defaultdict(list))
  for journal in journals:
    year = journal.date.strftime("%Y")
    month_string = spanish_months[journal.date.strftime("%B").lower()]
    # modified_date to "day day-string"
    journal.date = f"{journal.date.strftime('%d')} {spanish_days[journal.date.strftime('%A').lower()]}"
    journal_by_years[year][month_string].append(journal)

  journals_list = [
    {
      "year": year,
      "months": [
        {
          "month": month_string,
          "journals": journals
        }
        for month_string, journals in months.items()
      ]
    }
    for year, months in journal_by_years.items()
  ]

  db.close()
  return journals_list