import React from 'react';
import { render } from '@testing-library/react-native';
import ListaObjetivos from '../../src/components/listaObjetivos/ListaObjetivos.js';

describe('Integración de <ListaObjetivos />', () => {
  it('debería renderizar cada objetivo con su título y fecha', () => {
    const { getByText } = render(<ListaObjetivos />);

    expect(getByText('Objetivo 1')).toBeTruthy();
    expect(getByText('2021-01-01')).toBeTruthy();
    expect(getByText('Objetivo 10')).toBeTruthy();
    expect(getByText('2021-01-10')).toBeTruthy();
  });

  it('debería renderizar un FlatList', () => {
    const { getByTestId } = render(<ListaObjetivos />);
    expect(getByTestId('flatlist')).toBeTruthy();
  });
});

