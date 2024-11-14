import pytest
from httpx import AsyncClient
from src.app import app

@pytest.mark.asyncio
async def test_get_stats_rating():
    async with AsyncClient(app=app, base_url="http://localhost:5432") as ac:
        response = await ac.post("/login", json={"username": "testuser", "password": "testpass"})
        token = response.json()["jwt"]
        headers = {"Authorization": f"Bearer {token}"}

        week_stats = {"date": "2024-11-06"}  # Formato ISO para la fecha
        response = await ac.post("/stats-rating", json=week_stats, headers=headers)

        assert response.status_code == 200
        data = response.json()
        assert "rating_week" in data
        assert "rating_all" in data

@pytest.mark.asyncio
async def test_get_stats_moods():
    async with AsyncClient(app=app, base_url="http://localhost:5432") as ac:
        response = await ac.post("/login", json={"username": "testuser", "password": "testpass"})
        token = response.json()["jwt"]
        headers = {"Authorization": f"Bearer {token}"}

        week_stats = {"date": "2024-11-06"}  # Formato ISO para la fecha
        response = await ac.post("/stats-moods", json=week_stats, headers=headers)

        assert response.status_code == 200
        data = response.json()
        assert "moods_all" in data
        assert "moods_week" in data
