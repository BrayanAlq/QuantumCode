import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import NuevoObjetivo from '../../src/screens/nuevo_objetivo';

jest.mock('@expo/vector-icons', () => {
  return {
    Ionicons: () => 'Mocked Ionicons',
  };
});

describe('<NuevoObjetivo />', () => {
  const mockNavigation = { goBack: jest.fn() };

  it('debería renderizar correctamente el título y el botón de registrar', () => {
    const { getByText, getByPlaceholderText } = render(
      <NuevoObjetivo navigation={mockNavigation} />
    );

    expect(getByText('Nuevo Objetivo')).toBeTruthy();

    expect(getByPlaceholderText('Ingrese un nuevo objetivo personal')).toBeTruthy();
  });

  it('debería permitir ingresar un objetivo', () => {
    const { getByPlaceholderText } = render(
      <NuevoObjetivo navigation={mockNavigation} />
    );

    const inputObjetivo = getByPlaceholderText('Ingrese un nuevo objetivo personal');
    fireEvent.changeText(inputObjetivo, 'Aprender React Native');

    expect(inputObjetivo.props.value).toBe('Aprender React Native');
  });

  it('debería llamar a la función agregarObjetivo cuando se presiona el botón "Registrar Objetivo"', () => {
    const { getByText } = render(
      <NuevoObjetivo navigation={mockNavigation} />
    );

    const button = getByText('Registrar Objetivo');
    fireEvent.press(button);
  });

  it('debería navegar de regreso cuando se presiona el botón "Ver Lista"', () => {
    const { getByText } = render(
      <NuevoObjetivo navigation={mockNavigation} />
    );

    const button = getByText('Ver Lista');
    fireEvent.press(button);

    expect(mockNavigation.goBack).toHaveBeenCalled();
  });
});
