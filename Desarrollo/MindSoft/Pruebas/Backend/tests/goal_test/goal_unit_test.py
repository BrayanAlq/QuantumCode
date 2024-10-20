import pytest
from unittest.mock import MagicMock
from fastapi.testclient import TestClient
from src.app import app
from src.routes.goal import get_user_goals, create_goal_user, update_goal_user, complete_goal_user, delete_goal_user
from src.schemas.goal import GoalCreate, GoalUpdate, GoalUpdateStatus
from src.schemas.user import UserToJwt

client = TestClient(app)

def create_user_mock():
    user_mock = MagicMock(spec=UserToJwt)
    user_mock.user_id = 1
    user_mock.username = "test_user"
    user_mock.first_name = "Test"
    user_mock.last_name = "User"
    return user_mock

def test_get_user_goals():
    db_mock = MagicMock()
    user_mock = create_user_mock()
    
    response = get_user_goals(db=db_mock, user=user_mock)
    
    assert response is not None
    db_mock.query.assert_called()

def test_create_goal_user():
    db_mock = MagicMock()
    user_mock = create_user_mock()

    goal_mock = GoalCreate(goal_name="Learn Python", duration_days=10, start_date="2024-10-20")

    response = create_goal_user(goal=goal_mock, db=db_mock, user=user_mock)

    assert response is not None
    db_mock.add.assert_called()

def test_update_goal_user():
    db_mock = MagicMock()
    user_mock = create_user_mock()
    goal_mock = GoalUpdate(goal_id=1, goal_name="Updated Goal", duration_days=15)

    response = update_goal_user(goal=goal_mock, db=db_mock, user=user_mock)

    assert response is not None
    db_mock.query.assert_called()

def test_complete_goal_user():
    db_mock = MagicMock()
    user_mock = create_user_mock()
    goal_mock = GoalUpdateStatus(goal_id=1)

    response = complete_goal_user(goal=goal_mock, db=db_mock, user=user_mock)

    assert response is not None
    db_mock.query.assert_called()

def test_delete_goal_user():
    db_mock = MagicMock()
    user_mock = create_user_mock()
    goal_mock = GoalUpdateStatus(goal_id=1)

    response = delete_goal_user(goal=goal_mock, db=db_mock, user=user_mock)

    assert response is not None
    db_mock.query.assert_called()
