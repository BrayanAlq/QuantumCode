import pytest
from unittest.mock import MagicMock
from fastapi.testclient import TestClient
from fastapi import HTTPException
from src.app import app
from src.routes.mood_rating import create_user_mood_rating, check_user_daily_rating, get_user_mood_ratings
from src.schemas.mood_rating import MoodRatingCreate, CheckMoodRating
from src.schemas.user import UserToJwt
from src.services.database import get_db

client = TestClient(app)

# Mock de un usuario autenticado
def create_user_mock():
    user_mock = MagicMock(spec=UserToJwt)
    user_mock.user_id = 1
    user_mock.username = "test_user"
    user_mock.first_name = "Test"
    user_mock.last_name = "User"
    return user_mock

# Test para crear una calificación de humor
@pytest.mark.asyncio
async def test_create_mood_rating():
    db_mock = MagicMock()
    user_mock = create_user_mock()

    # Definimos una calificación de humor
    mood_mock = MoodRatingCreate(
        date="2024-10-20", 
        mood_detail=[{"mood_id": 1}, {"mood_id": 2}]
    )

    # Simulamos la llamada a la ruta de creación de calificación
    response = await create_user_mood_rating(mood_rating=mood_mock, db=db_mock, user=user_mock)

    # Verificamos que la respuesta y las interacciones con la base de datos sean las correctas
    assert response['message'] == "Estados de ánimo guardados correctamente"
    db_mock.add.assert_called()
    db_mock.commit.assert_called()

# Test para verificar si el usuario ya calificó el humor en un día
@pytest.mark.asyncio
async def test_check_user_daily_rating():
    db_mock = MagicMock()
    user_mock = create_user_mock()

    # Definimos una fecha de calificación
    check_mock = CheckMoodRating(date="2024-10-20")

    # Simulamos que el usuario ya ha calificado hoy (retornamos un conteo > 0)
    db_mock.query.return_value.filter.return_value.count.return_value = 1

    # Capturamos la excepción y verificamos que el mensaje de error es el esperado
    with pytest.raises(HTTPException) as exc_info:
        await check_user_daily_rating(check=check_mock, db=db_mock, user=user_mock)
    
    # Verificamos que la excepción tenga el código y el mensaje correctos
    assert exc_info.value.status_code == 403
    assert exc_info.value.detail == {"status": "forbidden", "message": "You already rated your moods today"}

    # Simulamos que el usuario no ha calificado hoy (conteo = 0)
    db_mock.query.return_value.filter.return_value.count.return_value = 0

    # Llamamos a la ruta para verificar si el usuario ya calificó
    response = await check_user_daily_rating(check=check_mock, db=db_mock, user=user_mock)

    # Verificamos que la respuesta sea la esperada
    assert response['status'] == "allowed"
    assert response['message'] == "You can rate your moods"

# Test para obtener todas las calificaciones de humor de un usuario
@pytest.mark.asyncio
async def test_get_user_mood_ratings():
    db_mock = MagicMock()
    user_mock = create_user_mock()

    # Simulamos que la base de datos devuelve algunas calificaciones de humor
    db_mock.query.return_value.join.return_value.join.return_value.options.return_value.filter.return_value.all.return_value = [
        {
            "mood": {"name": "Happy", "description": "Feeling good"},
            "date": "2024-10-20",
        }
    ]

    # Llamamos a la ruta para obtener las calificaciones
    response = await get_user_mood_ratings(db=db_mock, user=user_mock)

    # Verificamos que la respuesta no sea vacía y contiene los datos esperados
    assert len(response) > 0
    assert response[0]["mood"]["name"] == "Happy"
    db_mock.query.return_value.join.assert_called()

# Test para verificar la ruta de error cuando no hay calificaciones de humor
@pytest.mark.asyncio
async def test_no_mood_ratings():
    db_mock = MagicMock()
    user_mock = create_user_mock()

    # Simulamos que no hay calificaciones de humor en la base de datos
    db_mock.query.return_value.join.return_value.join.return_value.options.return_value.filter.return_value.all.return_value = []

    # Llamamos a la ruta para obtener las calificaciones
    with pytest.raises(HTTPException):
        await get_user_mood_ratings(db=db_mock, user=user_mock)
