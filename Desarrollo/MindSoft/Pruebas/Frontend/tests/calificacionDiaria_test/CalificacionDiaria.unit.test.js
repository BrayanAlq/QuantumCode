import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CalificacionDiaria from '../../src/components/CalificacionDiaria';

describe('<CalificacionDiaria />', () => {
  const mockOnClose = jest.fn();

  it('debería renderizar correctamente las secciones de calificación diaria y estado de ánimo', () => {
    const { getByText } = render(<CalificacionDiaria visible={true} onClose={mockOnClose} />);

    expect(getByText('¿Cómo te fue hoy?')).toBeTruthy();
    expect(getByText('¿Cómo te sientes?')).toBeTruthy();
    expect(getByText('Enviar')).toBeTruthy();
  });

  it('debería permitir seleccionar una emoción de calificación diaria', () => {
    const { getByText } = render(<CalificacionDiaria visible={true} onClose={mockOnClose} />);

    const emoji = getByText('😊');
    fireEvent.press(emoji);

    expect(getByText('Emoción seleccionada: 😊')).toBeTruthy();
  });

  it('debería permitir seleccionar una emoción de estado de ánimo', () => {
    const { getByText } = render(<CalificacionDiaria visible={true} onClose={mockOnClose} />);

    const emoji = getByText('🤩');
    fireEvent.press(emoji);

    expect(getByText('Emoción seleccionada: 🤩')).toBeTruthy();
  });

  it('debería cerrar el modal al presionar el botón de "Enviar"', () => {
    const { getByText } = render(<CalificacionDiaria visible={true} onClose={mockOnClose} />);

    fireEvent.press(getByText('Enviar'));

    expect(mockOnClose).toHaveBeenCalled();
  });
});
