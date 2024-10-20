import pytest
from httpx import AsyncClient
from src.app import app
from src.schemas.goal import GoalCreate, GoalUpdate, GoalUpdateStatus

@pytest.mark.asyncio
async def test_create_goal_user():
    async with AsyncClient(app=app, base_url="http://localhost:5432") as ac:
        response = await ac.post("/login", json={"username": "testuser", "password": "testpass"})
        token = response.json()["jwt"]
        headers = {"Authorization": f"Bearer {token}"}
        
        goal_data = {"goal_name": "Learn FastAPI", "duration_days": 10, "start_date": "2024-10-20"}
        response = await ac.post("/goal-create", json=goal_data, headers=headers)
        assert response.status_code == 200
        assert response.json()["goal"]["goal_name"] == "Learn FastAPI"

@pytest.mark.asyncio
async def test_get_user_goals():
    async with AsyncClient(app=app, base_url="http://localhost:5432") as ac:
        response = await ac.post("/login", json={"username": "testuser", "password": "testpass"})
        token = response.json()["jwt"]
        headers = {"Authorization": f"Bearer {token}"}
        
        response = await ac.get("/goal-active", headers=headers)
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0
        
        for goal in data:
            assert "goal_id" in goal
            assert "goal_name" in goal
            assert "user_id" in goal
            assert "duration_days" in goal
            assert "start_date" in goal
            assert "status" in goal
            assert goal["status"] == 0  

@pytest.mark.asyncio
async def test_update_goal_user():
    async with AsyncClient(app=app, base_url="http://localhost:5432") as ac:
        response = await ac.post("/login", json={"username": "testuser", "password": "testpass"})
        token = response.json()["jwt"]
        headers = {"Authorization": f"Bearer {token}"}
        
        goal_update = {"goal_id": 8, "goal_name": "Updated Goal", "duration_days": 20}
        response = await ac.put("/goal-update", json=goal_update, headers=headers)
        assert response.status_code == 200
        assert response.json()["goal"]["goal_name"] == "Updated Goal"

@pytest.mark.asyncio
async def test_complete_goal_user():
    async with AsyncClient(app=app, base_url="http://localhost:5432") as ac:
        response = await ac.post("/login", json={"username": "testuser", "password": "testpass"})
        token = response.json()["jwt"]
        headers = {"Authorization": f"Bearer {token}"}
        
        goal_complete = {"goal_id": 9}
        response = await ac.put("/goal-complete", json=goal_complete, headers=headers)
        assert response.status_code == 200
        assert response.json()["goal"]["status"] == 1
