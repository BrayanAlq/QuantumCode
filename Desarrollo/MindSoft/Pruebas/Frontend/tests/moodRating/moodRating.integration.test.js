import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import MoodRatingScreen from '../../src/screens/MoodRatingScreen'; // Asegúrate de que esta ruta sea correcta
import { useStoredMoodRaing } from '../../src/hooks/useStoredMoodRaing';
import { useNavigation } from '@react-navigation/native';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => 'Mocked Ionicons',
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('../../src/hooks/useStoredMoodRaing', () => ({
  useStoredMoodRaing: jest.fn(),
}));

describe('Integración de <MoodRatingScreen />', () => {
  const mockNavigation = { openDrawer: jest.fn(), navigate: jest.fn() };

  beforeEach(() => {
    useNavigation.mockReturnValue(mockNavigation);
    jest.clearAllMocks();
  });

  it('debería mostrar el indicador de carga al inicio', async () => {
    useStoredMoodRaing.mockReturnValue({
      moodRating: null,
      loading: true,
      error: null,
    });

    const { getByTestId } = render(<MoodRatingScreen />);

    await waitFor(() => {
      expect(getByTestId('loading-indicator')).toBeTruthy();
    });
  });

  it('debería mostrar un mensaje de error si ocurre un error', async () => {
    useStoredMoodRaing.mockReturnValue({
      moodRating: null,
      loading: false,
      error: 'Error al cargar los datos',
    });

    const { getByText } = render(<MoodRatingScreen />);

    await waitFor(() => {
      expect(getByText('Error al cargar los datos')).toBeTruthy();
    });
  });

  it('debería mostrar las calificaciones de ánimo cuando los datos se cargan correctamente', async () => {
    useStoredMoodRaing.mockReturnValue({
      moodRating: {
        moods_all: [
          { mood: 'Feliz', total_mood_ratings: 5 },
          { mood: 'Ansioso', total_mood_ratings: 3 },
        ],
      },
      loading: false,
      error: null,
    });

    const { getByText, debug } = render(<MoodRatingScreen />);

    await waitFor(() => {
      expect(getByText('😁')).toBeTruthy();
      expect(getByText('😬')).toBeTruthy();
    });
  });

  it('debería abrir el menú lateral al presionar el ícono del menú', async () => {
    const { getByTestId } = render(<MoodRatingScreen />);

    await waitFor(() => {
      fireEvent.press(getByTestId('menu-button'));
      expect(mockNavigation.openDrawer).toHaveBeenCalled();
    });
  });

  it('debería navegar a la pantalla de estadísticas al presionar el botón correspondiente', async () => {
    const { getByText } = render(<MoodRatingScreen />);

    fireEvent.press(getByText('Ver Estadísticas de calificación diaria'));

    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith('Estadisticas');
    });
  });
});
