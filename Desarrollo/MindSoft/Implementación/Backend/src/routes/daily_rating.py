from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..schemas.daily_rating import DailyRating