import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import AgregarNotas from '../../src/screens/diario_agregar';
import * as JournalService from '../../src/services/journal';
import * as SecureStore from 'expo-secure-store';  // Importar SecureStore

// Mock de SecureStore
jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
}));

// Mock de fetch
global.fetch = jest.fn();

// Mock de las funciones de JournalService
jest.mock('../../src/services/journal', () => ({
  createJournal: jest.fn().mockResolvedValue({
    id: 1,
    description: 'Hoy fue un gran día de trabajo',
    date: '2024-11-12',
  }),
  fetchJournals: jest.fn().mockResolvedValue([]), // Mock de fetchJournals
}));

// Mock de navegación
const mockNavigation = { navigate: jest.fn(), goBack: jest.fn() };

describe('Integración de <AgregarNotas />', () => {
  beforeEach(() => {
    // Simula que SecureStore siempre devuelve un token
    SecureStore.getItemAsync.mockResolvedValue('mockAuthToken');
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpiar mocks después de cada prueba
  });

  it('debería permitir cambiar el valor de la nota', () => {
    const { getByPlaceholderText } = render(<AgregarNotas navigation={mockNavigation} />);

    const inputNota = getByPlaceholderText('Escriba sobre su día');
    fireEvent.changeText(inputNota, 'Hoy fue un gran día de trabajo');

    // Verifica que el texto ingresado sea el esperado
    expect(inputNota.props.value).toBe('Hoy fue un gran día de trabajo');
  });

  it('debería llamar la función de crear nota cuando se presiona "Enviar Nota"', async () => {
    const { getByTestId, getByPlaceholderText } = render(<AgregarNotas navigation={mockNavigation} />);

    const inputNota = getByPlaceholderText('Escriba sobre su día');
    const sendButton = getByTestId('sendButton');

    // Simula la escritura de una nota
    fireEvent.changeText(inputNota, 'Hoy fue un gran día de trabajo');

    // Simula la pulsación del botón "Enviar Nota"
    await act(async () => {
      fireEvent.press(sendButton);
    });

    // Verifica que createJournal fue llamada con el texto y la fecha formateada
    await waitFor(() => {
      expect(JournalService.createJournal).toHaveBeenCalledWith(
        'Hoy fue un gran día de trabajo',
        expect.any(String), // Cualquier fecha válida
      );
    });
  });

  it('debería navegar a la pantalla DiarioNotas después de enviar la nota', async () => {
    const { getByTestId, getByPlaceholderText } = render(<AgregarNotas navigation={mockNavigation} />);

    const inputNota = getByPlaceholderText('Escriba sobre su día');
    const sendButton = getByTestId('sendButton');

    // Simula la escritura de una nota
    fireEvent.changeText(inputNota, 'Hoy fue un gran día de trabajo');

    // Simula la pulsación del botón "Enviar Nota"
    await act(async () => {
      fireEvent.press(sendButton);
    });

    // Verifica que la navegación a DiarioNotas haya ocurrido
    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith('DiarioNotas');
    });
  });
});
