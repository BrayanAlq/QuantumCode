import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import PantallaBienvenida from '../../src/screens/Bienvenida';

jest.mock('@expo/vector-icons', () => {
  return {
    Ionicons: () => 'Mocked Ionicons',
  };
});

describe('Integración de <PantallaBienvenida /> y <CalificacionDiaria />', () => {
  it('debería mostrar el componente CalificacionDiaria al presionar "Seleccionar emociones"', async () => {
    const { getByText, queryByText } = render(<PantallaBienvenida />);

  
    expect(queryByText('¿Cómo te fue hoy?')).toBeNull(); 


    const button = getByText('Seleccionar emociones');
    fireEvent.press(button);


    await waitFor(() => {

      expect(getByText('¿Cómo te fue hoy?')).toBeTruthy(); 
      expect(getByText('Enviar')).toBeTruthy(); 
    });
  });
});
