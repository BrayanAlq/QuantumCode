import pytest
from httpx import AsyncClient
from src.app import app

@pytest.mark.asyncio
async def test_register_user_integration():
    async with AsyncClient(app=app, base_url="http://localhost:8000") as ac:
        user_data = {
            "username": "newuser",
            "password": "newpass",
            "first_name": "New",
            "last_name": "User",
            "average": 3.5,
            "faculty": "Engineering",
            "address": "123 New St"
        }
        response = await ac.post("/signup", json=user_data)
        assert response.status_code == 200
        assert response.json()["message"] == "user created successfully"

@pytest.mark.asyncio
async def test_register_user_existing_username_integration():
    async with AsyncClient(app=app, base_url="http://localhost:8000") as ac:
        user_data = {
            "username": "existinguser",
            "password": "pass",
            "first_name": "Existing",
            "last_name": "User",
            "average": 3.5,
            "faculty": "Engineering",
            "address": "123 Existing St"
        }
        await ac.post("/signup", json=user_data)  # Registramos al usuario una vez

        response = await ac.post("/signup", json=user_data)  # Intentamos registrar de nuevo
        assert response.status_code == 409
        assert response.json()["detail"] == "username already exists"

@pytest.mark.asyncio
async def test_login_user_integration():
    async with AsyncClient(app=app, base_url="http://localhost:8000") as ac:
        # Primero, registra al usuario
        user_data = {
            "username": "testuser",
            "password": "testpass",
            "first_name": "Test",
            "last_name": "User",
            "average": 3.5,
            "faculty": "Engineering",
            "address": "123 Test St"
        }
        await ac.post("/signup", json=user_data)  # Registro del usuario

        # Luego intenta iniciar sesión
        login_data = {
            "username": "testuser",
            "password": "testpass"
        }
        response = await ac.post("/login", json=login_data)
        assert response.status_code == 200
        assert "jwt" in response.json()

@pytest.mark.asyncio
async def test_login_user_not_found_integration():
    async with AsyncClient(app=app, base_url="http://localhost:8000") as ac:
        user_data = {
            "username": "nonexistentuser",
            "password": "testpass"
        }
        response = await ac.post("/login", json=user_data)
        assert response.status_code == 404
        assert response.json()["detail"] == "El usuario no existe"

@pytest.mark.asyncio
async def test_login_user_incorrect_password_integration():
    async with AsyncClient(app=app, base_url="http://localhost:8000") as ac:
        # Primero, registra al usuario
        user_data = {
            "username": "testuser",
            "password": "testpass",
            "first_name": "Test",
            "last_name": "User",
            "average": 3.5,
            "faculty": "Engineering",
            "address": "123 Test St"
        }
        await ac.post("/signup", json=user_data)  # Registro del usuario

        # Luego intenta iniciar sesión con una contraseña incorrecta
        login_data = {
            "username": "testuser",
            "password": "wrongpass"
        }
        response = await ac.post("/login", json=login_data)
        assert response.status_code == 401
        assert response.json()["detail"] == "Contraseña incorrecta"
