import { renderHook, act } from '@testing-library/react-hooks';
import { useLogin } from '../../src/hooks/useAuth';
import * as SecureStore from 'expo-secure-store';
import { login } from '../../src/services/auth';

jest.mock('../../src/services/auth'); 
jest.mock('expo-secure-store'); 

describe('useLogin', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  it('debería iniciar sesión correctamente', async () => {
    const mockToken = 'mockToken';
    login.mockResolvedValue({ jwt: mockToken }); 

    const { result } = renderHook(() => useLogin());

    expect(result.current.loading).toBe(false); 

    await act(async () => {
      await result.current.loginUser('user', '12345');
    });

    expect(result.current.loading).toBe(false); 
    expect(result.current.token).toBe(mockToken); 
    expect(SecureStore.setItemAsync).toHaveBeenCalledWith('authToken', mockToken); 
    expect(result.current.error).toBe(null);
  });

  it('debería manejar errores en el inicio de sesión', async () => {
    const errorMessage = 'Error de autenticación';
    login.mockResolvedValue({ error: errorMessage }); 

    const { result } = renderHook(() => useLogin());

    expect(result.current.loading).toBe(false); 

    await act(async () => {
      await result.current.loginUser('wrongUser@example.com', 'wrongPassword');
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(errorMessage);
    expect(result.current.token).toBe(null);
  });
});
