import pytest
from httpx import AsyncClient
from src.app import app

# Helper para obtener los encabezados de autenticación
async def get_authenticated_headers():
    async with AsyncClient(app=app, base_url="http://localhost:8000") as ac:
        # Suponemos que el login es una API que devuelve un token JWT
        response = await ac.post("/login", json={"username": "testuser", "password": "testpass"})
        token = response.json()["jwt"]
        return {"Authorization": f"Bearer {token}"}

@pytest.mark.asyncio
async def test_create_mood_rating():
    headers = await get_authenticated_headers()

    # Datos de calificación de estado de ánimo para crear
    mood_data = {
        "date": "2024-10-20",
        "mood_detail": [{"mood_id": 1}, {"mood_id": 2}]  # Suponiendo que el ID 1 es "Happy" y el ID 2 es "Sad"
    }

    async with AsyncClient(app=app, base_url="http://localhost:8000") as ac:
        # Realizamos la solicitud POST para crear la calificación de estado de ánimo
        response = await ac.post("/mood-rating", json=mood_data, headers=headers)

    # Verificación de la respuesta
    assert response.status_code == 200
    assert response.json()["message"] == "Estados de ánimo guardados correctamente"


@pytest.mark.asyncio
async def test_get_user_mood_ratings():
    headers = await get_authenticated_headers()

    # Realizamos la solicitud GET para obtener las calificaciones de estado de ánimo del usuario
    async with AsyncClient(app=app, base_url="http://localhost:8000") as ac:
        response = await ac.get("/mood-rating", headers=headers)

    # Verificación de la respuesta
    assert response.status_code == 200
    data = response.json()

    # Verificamos que la respuesta sea una lista
    assert isinstance(data, list)
    assert len(data) > 0  # Aseguramos que hay al menos una calificación de estado de ánimo

    # Verificamos los detalles de cada calificación de estado de ánimo
    for mood_rating in data:
        assert "mood_rating_id" in mood_rating
        assert "date" in mood_rating
        assert "mood_rating_details" in mood_rating
        assert isinstance(mood_rating["mood_rating_details"], list)
        assert len(mood_rating["mood_rating_details"]) > 0  # Al menos un detalle de estado de ánimo
        
# Helper para verificar si el usuario ya ha calificado el día
async def has_user_already_rated_day(date: str, headers: dict) -> bool:
    async with AsyncClient(app=app, base_url="http://localhost:8000") as ac:
        # Revisamos si ya existe una calificación para ese día
        response = await ac.post("/check-daily-rating", json={"date": date}, headers=headers)
        if response.status_code == 403:  # Esto indica que ya calificado ese día
            return True
        return False

@pytest.mark.asyncio
async def test_check_user_daily_rating_forbidden():
    headers = await get_authenticated_headers()

    check_data = {"date": "2024-10-20"}

    # Verificamos si el usuario ya ha calificado este día
    if await has_user_already_rated_day(check_data["date"], headers):
        # Simulamos que el usuario ya ha calificado el día en cuestión
        mood_data = {
            "date": "2024-10-20",
            "mood_detail": [{"mood_id": 1}]
        }

        async with AsyncClient(app=app, base_url="http://localhost:8000") as ac:
            # Intentamos calificar nuevamente el mismo día
            response = await ac.post("/check-daily-rating", json=check_data, headers=headers)

        # Verificación de la respuesta
        assert response.status_code == 403
        assert "detail" in response.json()
        assert response.json()["detail"]["message"] == "You already rated your moods today"

@pytest.mark.asyncio
async def test_check_user_daily_rating_allowed():
    headers = await get_authenticated_headers()

    check_data = {"date": "2024-10-21"}

    # Verificamos si el usuario ya ha calificado este día
    if not await has_user_already_rated_day(check_data["date"], headers):
        # Si el usuario no ha calificado ese día, procedemos a crear la calificación
        mood_data = {
            "date": "2024-10-21",
            "mood_detail": [{"mood_id": 2}]  # Suponiendo que el ID 2 es otro estado de ánimo válido
        }

        async with AsyncClient(app=app, base_url="http://localhost:8000") as ac:
            # Realizamos la solicitud POST para crear la calificación
            await ac.post("/mood-rating", json=mood_data, headers=headers)

            # Intentamos calificar el mismo día nuevamente
            response = await ac.post("/check-daily-rating", json=check_data, headers=headers)

        # Verificación de la respuesta
        assert response.status_code == 200
        assert response.json()["status"] == "allowed"
        assert response.json()["message"] == "You can rate your moods"