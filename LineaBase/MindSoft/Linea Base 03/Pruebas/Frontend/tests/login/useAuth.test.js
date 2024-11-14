import { renderHook, act } from '@testing-library/react-hooks';
import { useLogin, useVerifyToken } from '../../src/hooks/useAuth';
import * as authService from '../../src/services/auth';

jest.mock('../../src/services/auth');

describe('useLogin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should login successfully', async () => {
    authService.login.mockResolvedValue({ jwt: 'mocked-token' });

    const { result, waitForNextUpdate } = renderHook(() => useLogin());

    act(() => {
      result.current.loginUser('test@example.com', 'password');
    });
    
    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.token).toBe('mocked-token');
    expect(result.current.error).toBe(null);
  });

  it('should handle login error', async () => {
    authService.login.mockResolvedValue({ error: 'Invalid credentials' });

    const { result, waitForNextUpdate } = renderHook(() => useLogin());

    act(() => {
      result.current.loginUser('test@example.com', 'wrong-password');
    });

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.token).toBe(null);
    expect(result.current.error).toBe('Invalid credentials');
  });
});

describe('useVerifyToken', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should verify token successfully', async () => {
    authService.verifyTokenOnServer.mockResolvedValue(true);

    const { result, waitForNextUpdate } = renderHook(() => useVerifyToken());

    act(() => {
      result.current.verifyToken('mocked-token');
    });

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.isOk).toBe(true);
  });

  it('should handle token verification error', async () => {
    authService.verifyTokenOnServer.mockResolvedValue({ error: 'Token no válido' });

    const { result, waitForNextUpdate } = renderHook(() => useVerifyToken());

    act(() => {
      result.current.verifyToken('invalid-token');
    });

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.isOk).toBe(false);
  });
});
