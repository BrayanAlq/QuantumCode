import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native'; // Necesitamos envolver en NavigationContainer
import Notas from '../../src/screens/diario_notas';  // Ajusta el path si es necesario
import { useJournal } from '../../src/hooks/useJournal';  // Mockearemos este hook
import { mockJournals } from '../../__mocks__/mockJournals'; // Importamos los mocks

// Mocks
jest.mock('../../src/hooks/useJournal');

describe('<Notas />', () => {
  beforeEach(() => {
    useJournal.mockReturnValue({
      fetchJournals: jest.fn(),
      journals: mockJournals,
    });
  });

  it('debería renderizar el título correctamente', () => {
    const { getByText } = render(
      <NavigationContainer>
        <Notas />
      </NavigationContainer>
    );
    expect(getByText('2024')).toBeTruthy();  // Verifica que el título "2024" se renderiza
  });

  it('debería mostrar las notas agrupadas por mes', () => {
    const { getByText } = render(
      <NavigationContainer>
        <Notas />
      </NavigationContainer>
    );
    
    // Verificar que se renderiza correctamente el mes y las notas
    expect(getByText('Enero')).toBeTruthy();
    expect(getByText('Febrero')).toBeTruthy();
    
    // Verificar que las notas están presentes
    expect(getByText('Nota 1')).toBeTruthy();
    expect(getByText('Nota 2')).toBeTruthy();
    expect(getByText('Nota 3')).toBeTruthy();
  });
});
