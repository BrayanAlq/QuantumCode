import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import AgregarNotas from '../../src/screens/diario_agregar'; // Asegúrate de que la ruta sea correcta
import { createJournal } from '../../src/services/journal';

// Mock de la navegación
const mockNavigation = {
  navigate: jest.fn(),
  openDrawer: jest.fn(),
};

// Mock de la función `createJournal` y `getJournals`
jest.mock('../../src/services/journal', () => ({
  createJournal: jest.fn(),
  getJournals: jest.fn(() => Promise.resolve([])), // Ejemplo de cómo mockearlo.
}));

describe('<AgregarNotas />', () => {

  it('debería obtener correctamente el mes actual', async () => {
    const { getByText } = render(<AgregarNotas navigation={mockNavigation} />);
    
    // Espera a que el mes actual se renderice
    await waitFor(() => {
      const currentMonth = new Date().toLocaleString('es-ES', { month: 'long' });
      console.log("Mes actual:", currentMonth); // Añade esto para ver qué mes se genera

      expect(getByText(new RegExp(currentMonth, 'i'))).toBeTruthy();
    });
  });

  it('debería permitir ingresar texto en el campo de entrada', async () => {
    const { getByPlaceholderText } = render(<AgregarNotas navigation={mockNavigation} />);
    
    const input = getByPlaceholderText('Escriba sobre su día');
    
    // Envuelve la interacción dentro de act() para asegurarnos de que el estado se actualiza correctamente
    await act(async () => {
      fireEvent.changeText(input, 'Hoy fue un buen día');
    });

    // Verifica que el valor haya cambiado
    expect(input.props.value).toBe('Hoy fue un buen día');
  });

  it('debería renderizar el botón "Enviar Nota"', async () => {
    const { getByTestId } = render(<AgregarNotas navigation={mockNavigation} />);
    
    // Encuentra el botón "Enviar Nota" por su testID
    const sendButton = getByTestId('sendButton');
    
    // Verifica que el botón exista
    expect(sendButton).toBeTruthy();
    
    // Si se están haciendo actualizaciones de estado asíncronas dentro de AgregarNotas, asegúrate de envolverlas en `act()`
    await act(async () => {
      // Aquí podrías simular el clic del botón, si lo deseas, y esperar que el estado cambie
      fireEvent.press(sendButton);
    });
  });
});
