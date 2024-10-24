import pytest
from unittest.mock import MagicMock, patch
from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.controllers.login import register_user, login_user
from src.schemas.user import UserCreate, UserLogin
from src.models import User
import bcrypt

@pytest.mark.asyncio
async def test_register_user():
    db_mock = MagicMock(spec=Session)
    user_data = UserCreate(
        username="testuser",
        password="testpass",
        first_name="Test",
        last_name="User",
        average=3.5,
        faculty="Engineering",
        address="123 Test St"
    )

    db_mock.query.return_value.filter.return_value.first.return_value = None

    response = await register_user(user_data, db_mock)

    assert response["message"] == "user created successfully"
    db_mock.add.assert_called()
    db_mock.commit.assert_called()

@pytest.mark.asyncio
async def test_register_user_existing_username():
    db_mock = MagicMock(spec=Session)
    user_data = UserCreate(
        username="testuser",
        password="testpass",
        first_name="Test",
        last_name="User",
        average=3.5,
        faculty="Engineering",
        address="123 Test St"
    )

    existing_user = MagicMock(spec=User)
    db_mock.query.return_value.filter.return_value.first.return_value = existing_user

    with pytest.raises(HTTPException) as excinfo:
        await register_user(user_data, db_mock)
    
    assert excinfo.value.status_code == 409
    assert excinfo.value.detail == "username already exists"

@pytest.mark.asyncio
async def test_login_user_success():
    db_mock = MagicMock(spec=Session)
    user_data = UserLogin(username="testuser", password="testpass")
    
    existing_user = MagicMock(spec=User)
    existing_user.username = "testuser"  # Asigna un valor válido
    existing_user.first_name = "Test"     # Asigna un valor válido
    existing_user.last_name = "User"       # Asigna un valor válido
    existing_user.password = bcrypt.hashpw(b"testpass", bcrypt.gensalt()).decode('utf-8')  # Genera un hash válido
    db_mock.query.return_value.filter.return_value.first.return_value = existing_user

    with patch('src.utils.bcrypt.verify_password', return_value=True):
        response = await login_user(user_data, db_mock)

    assert "jwt" in response
    db_mock.query.assert_called()

@pytest.mark.asyncio
async def test_login_user_not_found():
    db_mock = MagicMock(spec=Session)
    user_data = UserLogin(username="testuser", password="testpass")

    db_mock.query.return_value.filter.return_value.first.return_value = None

    with pytest.raises(HTTPException) as excinfo:
        await login_user(user_data, db_mock)

    assert excinfo.value.status_code == 404
    assert excinfo.value.detail == "El usuario no existe"

@pytest.mark.asyncio
async def test_login_user_incorrect_password():
    db_mock = MagicMock(spec=Session)
    user_data = UserLogin(username="testuser", password="wrongpass")

    existing_user = MagicMock(spec=User)
    existing_user.username = "testuser"  # Asigna un valor válido
    existing_user.first_name = "Test"     # Asigna un valor válido
    existing_user.last_name = "User"       # Asigna un valor válido
    existing_user.password = bcrypt.hashpw(b"testpass", bcrypt.gensalt()).decode('utf-8')  # Genera un hash válido
    db_mock.query.return_value.filter.return_value.first.return_value = existing_user

    with patch('src.utils.bcrypt.verify_password', return_value=False):
        with pytest.raises(HTTPException) as excinfo:
            await login_user(user_data, db_mock)

    assert excinfo.value.status_code == 401
    assert excinfo.value.detail == "Contraseña incorrecta"
