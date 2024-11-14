import pytest
from httpx import AsyncClient
from src.app import app

@pytest.mark.asyncio
async def test_create_journal():
    async with AsyncClient(app=app, base_url="http://localhost:5432") as ac:
        # Simula el inicio de sesión
        response = await ac.post("/login", json={"username": "testuser", "password": "testpass"})
        token = response.json()["jwt"]
        headers = {"Authorization": f"Bearer {token}"}

        # Datos del journal
        journal_data = {
            "description": "Mi primer diario",
            "date": "2024-10-20"  # Usamos una fecha en formato string (año-mes-día)
        }

        # Hacer la solicitud para crear un diario
        response = await ac.post("/journal", json=journal_data, headers=headers)  # Usar /journal en lugar de /journal-create

        # Verificar que la respuesta sea exitosa
        assert response.status_code == 200
        assert response.json()["message"] == "journal created successfully"
        assert "data" in response.json()

@pytest.mark.asyncio
async def test_get_user_journal():
    async with AsyncClient(app=app, base_url="http://localhost:5432") as ac:
        # Simula el inicio de sesión
        response = await ac.post("/login", json={"username": "testuser", "password": "testpass"})
        token = response.json()["jwt"]
        headers = {"Authorization": f"Bearer {token}"}

        # Hacer la solicitud para obtener los journals
        response = await ac.get("/journal", headers=headers)

        # Verificar que la respuesta sea exitosa
        assert response.status_code == 200
        assert isinstance(response.json(), list)  # Debe ser una lista de journals
        assert len(response.json()) > 0  # Debe haber al menos un journal