from unittest.mock import MagicMock, patch
from src.routes.stat import get_stats_moods
from src.schemas.stat import WeekStats
from src.schemas.user import UserToJwt

def create_user_mock():
    user_mock = MagicMock(spec=UserToJwt)
    user_mock.user_id = 1
    user_mock.username = "test_user"
    user_mock.first_name = "Test"
    user_mock.last_name = "User"
    return user_mock

@patch("src.routes.stat.get_moods_stats_by_week")
@patch("src.routes.stat.get_moods_stats")
def test_get_stats_moods(mock_get_moods_stats, mock_get_moods_stats_by_week):
    db_mock = MagicMock()
    user_mock = create_user_mock()
    week_stats_mock = WeekStats(date="2024-11-11")

    mock_get_moods_stats_by_week.return_value = [{"mood": "Happy", "count": 5}]
    mock_get_moods_stats.return_value = [{"mood": "Sad", "count": 3}]

    response = get_stats_moods(week_stats=week_stats_mock, db=db_mock, user=user_mock)

    assert response is not None
    assert "moods_week" in response
    assert "moods_all" in response
    assert response["moods_week"] == [{"mood": "Happy", "count": 5}]
    assert response["moods_all"] == [{"mood": "Sad", "count": 3}]

    mock_get_moods_stats_by_week.assert_called_once_with(db_mock, user_mock, week_stats_mock)
    mock_get_moods_stats.assert_called_once_with(db_mock, user_mock)
