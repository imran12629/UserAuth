import React from 'react';
import { AuthProvider, AuthContext } from '../../src/context/AuthContext';
import act from '@testing-library/react-native/build/act';
import { renderHook } from '@testing-library/react-native';
import { LABELS } from '../../src/utils/constants';

jest.mock('../../src/utils/storage', () => ({
  storage: {
    getUserDetails: jest.fn(),
    getEncryptedPassword: jest.fn(),
    saveUserDetails: jest.fn(),
    saveEncryptedPassword: jest.fn(),
    saveUserSession: jest.fn(),
    clearSession: jest.fn(),
  },
}));

const { storage } = require('../../src/utils/storage');

describe('AuthContext', () => {
  const wrapper = ({ children }: any) => <AuthProvider>{children}</AuthProvider>;

  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('initial loading and session check', async () => {
    storage.getUserDetails.mockResolvedValue([
      { name: 'A', email: 'a@test.com', password: '123', isLoggedIn: true },
    ]);
  
    const { result } = renderHook(() => React.useContext(AuthContext), {
      wrapper,
    });
  
    await act(async () => {
      await Promise.resolve();
    });
  
    expect(result.current.loading).toBe(false);
    expect(result.current.user?.email).toBe('a@test.com');
  });
  

 
  test('getCurrentSession returns correct user', async () => {
    storage.getUserDetails.mockResolvedValue([
      { email: 'b@test.com', password: '123', name: 'B', isLoggedIn: true },
    ]);

    const { result } = renderHook(() => React.useContext(AuthContext), {
      wrapper,
    });

    const session = await act(async () => await result.current.getCurrentSession());

    expect(session.isLoggedIn).toBe(true);
    expect(session.user.email).toBe('b@test.com');
  });

  test('login successful', async () => {
    storage.getUserDetails.mockResolvedValue([
      { name: 'A', email: 'a@test.com', password: '123', isLoggedIn: false },
    ]);
  
    storage.getEncryptedPassword.mockResolvedValue('123');
    storage.saveUserDetails.mockResolvedValue();
    storage.saveUserSession.mockResolvedValue();
  
    const { result } = renderHook(() => React.useContext(AuthContext), {
      wrapper,
    });
  
    await act(async () => {
      const response = await result.current.login('a@test.com', '123');
      expect(response.status).toBe(true);
      expect(response.user?.email).toBe('a@test.com');
    });
  
    expect(result.current.isLoggedIn).toBe(true);
    expect(result.current.user?.email).toBe('a@test.com');
  });
  
  test('login fails if user does not exist', async () => {
    storage.getUserDetails.mockResolvedValue([]);

    const { result } = renderHook(() => React.useContext(AuthContext), {
      wrapper,
    });

    const response = await act(async () =>
      result.current.login('ghost@test.com', '123'),
    );

    expect(response.status).toBe(false);
    expect(response.message).toBe(LABELS.login_user_does_not_exist);
  });

  test('login fails if wrong password', async () => {
    storage.getUserDetails.mockResolvedValue([
      { email: 'john@test.com', password: 'xxx', isLoggedIn: false },
    ]);

    storage.getEncryptedPassword.mockResolvedValue('correct-password');

    const { result } = renderHook(() => React.useContext(AuthContext), {
      wrapper,
    });

    const response = await act(async () =>
      result.current.login('john@test.com', 'wrong'),
    );

    expect(response.status).toBe(false);
    expect(response.message).toBe('Incorrect password');
  });

  test('signup successful and saves user', async () => {
    storage.getUserDetails.mockResolvedValue([]);
    storage.saveEncryptedPassword.mockResolvedValue();

    const { result } = renderHook(() => React.useContext(AuthContext), {
      wrapper,
    });

    const response = await act(async () =>
      result.current.signup({
        name: 'NewUser',
        email: 'new@test.com',
        password: 'pass',
        isLoggedIn: false,
      }),
    );

    expect(response.status).toBe(true);
    expect(storage.saveUserDetails).toHaveBeenCalled();
    expect(storage.saveEncryptedPassword).toHaveBeenCalledWith(
      'new@test.com',
      'pass',
    );
  });

  test('logout clears session and updates state', async () => {
    const { result } = renderHook(() => React.useContext(AuthContext), {
      wrapper,
    });

    await act(async () => {
      await result.current.logout();
    });

    expect(storage.clearSession).toHaveBeenCalled();
    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.user).toBe(null);
  });
});
