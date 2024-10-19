import React from 'react';
import { render } from '@testing-library/react-native';
import ListaObjetivos from '../../src/components/listaObjetivos/ListaObjetivos';

describe('<ListaObjetivos />', () => {
  it('debería renderizar correctamente el título', () => {
    const { getByText } = render(<ListaObjetivos />);
    expect(getByText('Lista de Objetivos')).toBeTruthy();
  });

  it('debería renderizar todos los elementos de la lista', () => {
    const { getAllByTestId } = render(<ListaObjetivos />);
    const items = getAllByTestId('objetivo-item');
    expect(items.length).toBe(10);
  });
});
