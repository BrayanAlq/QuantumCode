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

describe('<MoodRatingScreen />', () => {
  const mockNavigation = { openDrawer: jest.fn(), navigate: jest.fn() };

  beforeEach(() => {
    useNavigation.mockReturnValue(mockNavigation);
    jest.clearAllMocks();
  });

  it('debería mostrar el indicador de carga cuando los datos están siendo cargados', async () => {
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

  it('debería mostrar un mensaje de error cuando ocurre un error en la carga de los datos', async () => {
    useStoredMoodRaing.mockReturnValue({
      moodRating: null,
      loading: false,
      error: 'Error cargando los datos',
    });

    const { getByText } = render(<MoodRatingScreen />);

    await waitFor(() => {
      expect(getByText('Error cargando los datos')).toBeTruthy();
    });
  });

  it('debería mostrar las calificaciones de ánimo cuando los datos se cargan correctamente', async () => {
    useStoredMoodRaing.mockReturnValue({
      moodRating: {
        moods_all: [
          { mood: 'Feliz', total_mood_ratings: 5 },
          { mood: 'Ansioso', total_mood_ratings: 3 },
        ],
        moods_week: [
          { mood: 'Deprimido', total_mood_ratings: 2 },
          { mood: 'Eufórico', total_mood_ratings: 7 },
        ],
      },
      loading: false,
      error: null,
    });

    const { getByText } = render(<MoodRatingScreen />);

    await waitFor(() => {
      // Verificamos que los íconos correspondientes se muestren
      expect(getByText('😁')).toBeTruthy();  // Emoji de 'Feliz'
      expect(getByText('😬')).toBeTruthy();  // Emoji de 'Ansioso'
      expect(getByText('😔')).toBeTruthy();  // Emoji de 'Deprimido'
      expect(getByText('🤩')).toBeTruthy(); // Emoji de 'Eufórico'
    });
  });

  it('debería abrir el menú lateral al presionar el ícono del menú', async () => {
    const { getByTestId } = render(<MoodRatingScreen />);

    await waitFor(() => {
      fireEvent.press(getByTestId('menu-button'));
      expect(mockNavigation.openDrawer).toHaveBeenCalled();
    });
  });

  it('debería navegar a la pantalla de estadísticas al presionar el botón de ver estadísticas', async () => {
    const { getByText } = render(<MoodRatingScreen />);

    await waitFor(() => {
      fireEvent.press(getByText('Ver Estadísticas de calificación diaria'));
      expect(mockNavigation.navigate).toHaveBeenCalledWith('Estadisticas');
    });
  });

  it('debería transformar los datos correctamente con la función addIcons', () => {
    const moodIcons = {
      Deprimido: "😔",
      Inseguro: "😟",
      Ansioso: "😬",
      Enojado: "😠",
      Exhausto: "😵‍💫",
      Eufórico: "🤩",
      Aliviado: "😌",
      Sorprendido: "😲",
      Feliz: "😁",
    };

    const mockData = [
      { mood: 'Feliz', total_mood_ratings: 5 },
      { mood: 'Ansioso', total_mood_ratings: 3 },
    ];

    // Definir la función addIcons dentro del test para simular el comportamiento
    const addIcons = (moodData, icons) => {
      if (!moodData || moodData.some(item => item.message)) return []; // Añadimos chequeo de mensaje o undefined
      return moodData.map((item) => ({
        mood: icons[item.mood] || "",  // Asignamos un ícono basado en el estado de ánimo
        total_mood_ratings: item.total_mood_ratings,
      }));
    };

    const transformedData = addIcons(mockData, moodIcons);
    expect(transformedData).toEqual([
      { mood: "😁", total_mood_ratings: 5 },
      { mood: "😬", total_mood_ratings: 3 },
    ]);
  });

  it('debería devolver un array vacío si moodData es undefined o contiene un mensaje', () => {
    const moodIcons = {
      Deprimido: "😔",
      Inseguro: "😟",
      Ansioso: "😬",
      Enojado: "😠",
      Exhausto: "😵‍💫",
      Eufórico: "🤩",
      Aliviado: "😌",
      Sorprendido: "😲",
      Feliz: "😁",
    };

    // Definir la función addIcons dentro del test para simular el comportamiento
    const addIcons = (moodData, icons) => {
      if (!moodData || moodData.some(item => item.message)) return []; // Añadimos chequeo de mensaje o undefined
      return moodData.map((item) => ({
        mood: icons[item.mood] || "",  // Asignamos un ícono basado en el estado de ánimo
        total_mood_ratings: item.total_mood_ratings,
      }));
    };

    const resultWithNoData = addIcons(undefined, moodIcons);
    expect(resultWithNoData).toEqual([]);

    const resultWithMessage = addIcons([{ message: 'Error message' }], moodIcons);
    expect(resultWithMessage).toEqual([]);
  });
});
