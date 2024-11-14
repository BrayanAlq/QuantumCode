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
  getDailyRatings: jest.fn(() => Promise.resolve([])), // Simula datos válidos
}));

describe('<Estadisticas />', () => {
  const mockNavigation = { openDrawer: jest.fn(), navigate: jest.fn() };

  beforeEach(() => {
    useNavigation.mockReturnValue(mockNavigation);
    jest.clearAllMocks();
  });

  it('debería mostrar el indicador de carga cuando está cargando datos', async () => {
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

  it('debería abrir el menú lateral al presionar el ícono del menú', async () => {
    const { getByTestId } = render(<Estadisticas />);

    await waitFor(() => {
      fireEvent.press(getByTestId('menu-button'));
      expect(mockNavigation.openDrawer).toHaveBeenCalled();
    });
  });
});
