import pytest
from unittest.mock import MagicMock
from fastapi.testclient import TestClient
from datetime import datetime
from src.app import app
from src.controllers.journal import create_journal, get_journal
from src.schemas.journal import JournalCreateDTO
from src.schemas.user import UserToJwt
from sqlalchemy.orm import Session
from fastapi import HTTPException

client = TestClient(app)

# Función para crear un mock del usuario
def create_user_mock():
    user_mock = MagicMock(spec=UserToJwt)
    user_mock.user_id = 1
    user_mock.username = "test_user"
    user_mock.first_name = "Test"
    user_mock.last_name = "User"
    return user_mock

# Función para crear un mock de la base de datos
def create_db_mock():
    db_mock = MagicMock(spec=Session)
    return db_mock

# Prueba para crear un diario
@pytest.mark.asyncio
async def test_create_journal():
    db_mock = create_db_mock()
    user_mock = create_user_mock()

    # Simulamos el DTO que se pasa a la función de crear el diario
    journal_mock = JournalCreateDTO(description="Mi primer diario", date=datetime(2024, 10, 20))

    # Llamamos a la función de crear el diario
    response = await create_journal(journal=journal_mock, db=db_mock, user=user_mock)

    # Verificamos que la respuesta no sea None y que se haya ejecutado correctamente
    assert response is not None
    assert response["message"] == "journal created successfully"
    assert response["data"]["year"] == "2024"
    assert response["data"]["month"] == "Octubre"  # Usando el mes en español
    assert response["data"]["journal"].description == "Mi primer diario"

    # Verificamos que la base de datos haya agregado el nuevo diario
    db_mock.add.assert_called_once()

# Prueba para obtener los diarios de un usuario (cuando hay diarios)
@pytest.mark.asyncio
async def test_get_user_journal_with_data():
    db_mock = create_db_mock()
    user_mock = create_user_mock()

    # Creamos algunos diarios para que sean devueltos por la consulta
    mock_journal_1 = MagicMock()
    mock_journal_1.date = datetime(2024, 10, 20)
    mock_journal_1.description = "Mi primer diario"
    mock_journal_1.user_id = user_mock.user_id

    mock_journal_2 = MagicMock()
    mock_journal_2.date = datetime(2024, 11, 5)
    mock_journal_2.description = "Diario de noviembre"
    mock_journal_2.user_id = user_mock.user_id

    # Simulamos que la consulta devuelva los diarios
    db_mock.query.return_value.filter.return_value.order_by.return_value.all.return_value = [mock_journal_1, mock_journal_2]

    # Llamamos a la función get_journal
    response = await get_journal(db=db_mock, user=user_mock)

    # Verificamos que la respuesta no sea None y tiene la estructura esperada
    assert response is not None
    assert isinstance(response, list)
    assert len(response) > 0  # Aseguramos que haya al menos un año
    assert "year" in response[0]
    assert "months" in response[0]
    assert len(response[0]["months"]) > 0  # Aseguramos que haya meses dentro del año
    assert response[0]["year"] == "2024"
    assert response[0]["months"][0]["month"] == "Octubre"  # Comprobamos que el mes esté en español

# Prueba para obtener los diarios de un usuario (cuando no hay diarios)
@pytest.mark.asyncio
async def test_get_user_journal_no_data():
    db_mock = create_db_mock()
    user_mock = create_user_mock()

    # Simulamos que la consulta no devuelva ningún diario
    db_mock.query.return_value.filter.return_value.order_by.return_value.all.return_value = []

    # Llamamos a la función get_journal
    with pytest.raises(HTTPException):
        await get_journal(db=db_mock, user=user_mock)