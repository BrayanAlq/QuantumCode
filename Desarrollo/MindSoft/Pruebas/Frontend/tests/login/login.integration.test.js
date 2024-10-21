import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../../src/screens/Login';
import { useLogin, useVerifyToken } from '../../src/hooks/useAuth';

jest.mock('../../src/hooks/useAuth');

describe('Login Component', () => {
  let mockLoginUser;
  let mockVerifyToken; 

  beforeEach(() => {
    mockLoginUser = jest.fn();
    mockVerifyToken = jest.fn();
    
    useLogin.mockReturnValue({
      loginUser: mockLoginUser,
      loading: false,
      error: null,
      token: null,
    });
  });

  useVerifyToken.mockReturnValue({
    verifyToken: mockVerifyToken,
    loading: false,
    isOk: false,
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería renderizar sin errores', () => {
    render(
      <NavigationContainer>
        <Login />
      </NavigationContainer>
    );
  });

  it('debería contener campos de entrada para usuario y contraseña', () => {
    const { getByPlaceholderText } = render(
      <NavigationContainer>
        <Login />
      </NavigationContainer>
    );

    expect(getByPlaceholderText('Username')).toBeTruthy();
    expect(getByPlaceholderText('Contraseña')).toBeTruthy();
  });

  it('debería permitir ingresar un usuario y una contraseña', () => {
    const { getByPlaceholderText } = render(
      <NavigationContainer>
        <Login />
      </NavigationContainer>
    );

    const userInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Contraseña');

    fireEvent.changeText(userInput, 'testUser');
    fireEvent.changeText(passwordInput, 'password123');

    expect(userInput.props.value).toBe('testUser');
    expect(passwordInput.props.value).toBe('password123'); 
  });

  it('debería llamar a la función de inicio de sesión al hacer clic en el botón', () => {
    const { getByText, getByPlaceholderText } = render(
      <NavigationContainer>
        <Login />
      </NavigationContainer>
    );

    const userInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Contraseña');
    const loginButton = getByText('Inicio de sesión');

    fireEvent.changeText(userInput, 'testUser');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(loginButton); 

    expect(mockLoginUser).toHaveBeenCalledWith('testUser', 'password123'); 
  });
});
