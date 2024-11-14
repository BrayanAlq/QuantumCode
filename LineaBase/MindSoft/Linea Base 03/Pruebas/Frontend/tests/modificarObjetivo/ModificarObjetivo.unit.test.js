import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ModificarObjetivo from '../../src/screens/mod_objetivo.js';

jest.mock('@expo/vector-icons', () => {
  return {
    Ionicons: () => 'Mocked Ionicons',
  };
});

describe('<ModificarObjetivo />', () => {
  const mockNavigation = { goBack: jest.fn() };

  it('debería renderizar correctamente el título y el botón de modificar', () => {
    const { getByText, getByPlaceholderText } = render(<ModificarObjetivo navigation={mockNavigation} />);

    expect(getByText('Modificar Objetivo')).toBeTruthy();

    expect(getByPlaceholderText('Modifique su objetivo')).toBeTruthy();
    expect(getByPlaceholderText('Nuevo plazo: ')).toBeTruthy();

    expect(getByText('Modificar')).toBeTruthy();
  });

  it('debería permitir modificar el objetivo', () => {
    const { getByPlaceholderText, getByText } = render(<ModificarObjetivo navigation={mockNavigation} />);

    const inputObjetivo = getByPlaceholderText('Modifique su objetivo');

    fireEvent.changeText(inputObjetivo, 'Nuevo Objetivo');

    fireEvent.press(getByText('Modificar'));

    expect(inputObjetivo.props.value).toBe('');
  });

  it('debería navegar de regreso cuando se presiona el botón "Ver Lista"', () => {
    const { getByText } = render(<ModificarObjetivo navigation={mockNavigation} />);

    fireEvent.press(getByText('Ver Lista'));

    expect(mockNavigation.goBack).toHaveBeenCalled();
  });
});
