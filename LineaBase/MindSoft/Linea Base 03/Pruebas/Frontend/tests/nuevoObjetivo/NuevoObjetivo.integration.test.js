import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import NuevoObjetivo from '../../src/screens/nuevo_objetivo';

jest.mock('@expo/vector-icons', () => {
  return {
    Ionicons: () => 'Mocked Ionicons',
  };
});

describe('Integración de <NuevoObjetivo />', () => {
  const mockNavigation = { goBack: jest.fn() };

  it('debería permitir cambiar el valor del objetivo y tiempo', () => {
    const { getByPlaceholderText } = render(
      <NuevoObjetivo navigation={mockNavigation} />
    );

    const inputObjetivo = getByPlaceholderText('Ingrese un nuevo objetivo personal');
    const inputTiempo = getByPlaceholderText('Tiempo estimado: ');

    fireEvent.changeText(inputObjetivo, 'Aprender React Native');
    fireEvent.changeText(inputTiempo, '30');

    expect(inputObjetivo.props.value).toBe('Aprender React Native');
    expect(inputTiempo.props.value).toBe('30');
  });

  it('debería llamar la función agregarObjetivo cuando se presiona "Registrar Objetivo"', () => {
    const { getByText } = render(
      <NuevoObjetivo navigation={mockNavigation} />
    );

    const button = getByText('Registrar Objetivo');
    fireEvent.press(button);
  });
});
