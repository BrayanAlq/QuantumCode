import pytest
from httpx import AsyncClient
from src.app import app
from src.schemas.daily_rating import DailyRatingCreate, DailyRatingResponse

@pytest.mark.asyncio
async def test_create_daily_rating():
    async with AsyncClient(app=app, base_url="http://localhost:5432") as ac:
        
        response = await ac.post("/login", json={"username": "user1233", "password": "pass1233"})
        token = response.json()["jwt"]
        headers = {"Authorization": f"Bearer {token}"}
        
        daily_rating_data = {"rating": 5, "date": "2024-10-20"}
        response = await ac.post("/user-daily_rating", json=daily_rating_data, headers=headers)
        
        assert response.status_code == 200
        assert response.json()["rating"] == 5
        assert response.json()["date"] == "2024-10-20"

@pytest.mark.asyncio
async def test_get_user_daily_ratings():
    async with AsyncClient(app=app, base_url="http://localhost:5432") as ac:
    
        response = await ac.post("/login", json={"username": "user1233", "password": "pass1233"})
        token = response.json()["jwt"]
        headers = {"Authorization": f"Bearer {token}"}
        
        response = await ac.get("/user-daily_rating", headers=headers)
        
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0 
        
        for rating in data:
            assert "daily_rating_id" in rating
            assert "rating" in rating
            assert "date" in rating
            assert "user_id" in rating

