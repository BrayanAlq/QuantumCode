import pytest
from unittest.mock import MagicMock
from fastapi.testclient import TestClient
from src.app import app
from src.routes.daily_rating import get_user_daily_rating, create_user_daily_rating
from src.schemas.daily_rating import DailyRatingCreate
from src.schemas.user import UserToJwt

client = TestClient(app)


def create_user_mock():
    user_mock = MagicMock(spec=UserToJwt)
    user_mock.user_id = 1
    user_mock.username = "test_user"
    user_mock.first_name = "Test"
    user_mock.last_name = "User"
    return user_mock


def test_get_user_daily_rating():
    db_mock = MagicMock()
    user_mock = create_user_mock()
    
    response = get_user_daily_rating(db=db_mock, user=user_mock)
    
    assert response is not None
    db_mock.query.assert_called()


def test_create_user_daily_rating():
    db_mock = MagicMock()
    user_mock = create_user_mock()


    daily_rating_mock = DailyRatingCreate(rating=5, date="2024-10-20")

    response = create_user_daily_rating(daily_rating=daily_rating_mock, db=db_mock, user=user_mock)

    assert response is not None
    db_mock.add.assert_called()
