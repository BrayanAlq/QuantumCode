import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Estadisticas from '../../src/screens/estadisticas';
import { usePromedio } from '../../src/hooks/usePromedio';
import { useNavigation } from '@react-navigation/native';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => 'Mocked Ionicons',
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
  useFocusEffect: jest.fn((cb) => cb()),
}));

jest.mock('../../src/hooks/usePromedio', () => ({
  usePromedio: jest.fn(),
}));

jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(() => Promise.resolve('mockToken')),
}));

jest.mock('../../src/services/dailyRating', () => ({
  getDailyRatings: jest.fn(() => Promise.resolve([])),
}));

describe('Integración de <Estadisticas />', () => {
  const mockNavigation = { openDrawer: jest.fn(), navigate: jest.fn() };

  beforeEach(() => {
    useNavigation.mockReturnValue(mockNavigation);
    jest.clearAllMocks();
  });

  it('debería renderizar correctamente y mostrar el indicador de carga al inicio', async () => {
    usePromedio.mockReturnValue({
      rating_week: null,
      rating_all: [],
      loading: true,
      error: null,
      fetchStatRating: jest.fn(),
    });

    const { getByTestId } = render(<Estadisticas />);

    await waitFor(() => {
      expect(getByTestId('loading-indicator')).toBeTruthy();
    });
  });

  it('debería mostrar un mensaje si no hay datos para el gráfico', async () => {
    usePromedio.mockReturnValue({
      rating_week: { average_rating: 4.2 },
      rating_all: [],
      loading: false,
      error: null,
      fetchStatRating: jest.fn(),
    });

    const { getByText } = render(<Estadisticas />);

    await waitFor(() => {
      expect(getByText('No hay suficientes datos para mostrar el gráfico.')).toBeTruthy();
    });
  });

  it('debería abrir el menú lateral al presionar el ícono del menú', async () => {
    const { getByTestId } = render(<Estadisticas />);

    await waitFor(() => {
      fireEvent.press(getByTestId('menu-button'));
      expect(mockNavigation.openDrawer).toHaveBeenCalled();
    });
  });

  it('debería navegar a la pantalla de estadísticas de emociones al presionar el botón correspondiente', async () => {
    const { getByText } = render(<Estadisticas />);

    fireEvent.press(getByText('Ver Estadísticas de Emociones'));

    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith('Estadisticas2');
    });
  });
});

