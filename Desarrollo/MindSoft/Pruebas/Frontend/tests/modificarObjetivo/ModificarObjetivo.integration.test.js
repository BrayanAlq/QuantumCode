import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ModificarObjetivo from '../../src/screens/mod_objetivo.js';

jest.mock('@expo/vector-icons', () => {
  return {
    Ionicons: () => 'Mocked Ionicons',
  };
});

describe('Integración de <ModificarObjetivo />', () => {
  const mockNavigation = { goBack: jest.fn() };

  it('debería permitir cambiar el valor del objetivo y plazo', () => {
    const { getByPlaceholderText } = render(
      <ModificarObjetivo navigation={mockNavigation} />
    );

    const inputObjetivo = getByPlaceholderText('Modifique su objetivo');
    const inputTiempo = getByPlaceholderText('Nuevo plazo: ');

    fireEvent.changeText(inputObjetivo, 'Nuevo Objetivo');
    expect(inputObjetivo.props.value).toBe('Nuevo Objetivo');

    fireEvent.changeText(inputTiempo, '5');
    expect(inputTiempo.props.value).toBe('5');
  });

  it('debería llamar la función modificarObjetivo cuando se presiona "Modificar"', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const { getByText } = render(
      <ModificarObjetivo navigation={mockNavigation} />
    );

    const button = getByText('Modificar');
    fireEvent.press(button);

    expect(consoleSpy).toHaveBeenCalledWith('Objetivo modificado:', '');
    consoleSpy.mockRestore();
  });
});
