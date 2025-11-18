import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { storage } from '../utils/storage';
import { ERROR, LABELS } from '../utils/constants';

export interface User {
  name: string;
  email?: string;
  token?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isLoggedIn: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<{
    status: boolean;
    message: string;
    user?: User;
  }>;

  signup: (data: { name: string; email: string; password: string }) => Promise<{
    status: boolean;
    message: string;
  }>;

  logout: () => Promise<void>;
  getCurrentSession: () => Promise<{
    isLoggedIn: boolean;
    user: User | null;
  }>;
  setIsLoggedIn: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isLoggedIn: false,
  login: async () => ({
    status: false,
    message: 'Not implemented',
  }),
  signup: async () => ({
    status: false,
    message: 'Not implemented',
  }),
  setIsLoggedIn: (value: boolean) => null,
  logout: async () => {},
  getCurrentSession: async () => ({ isLoggedIn: false, user: null }),
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const session = await storage.getUserSession();
      const savedUser = await storage.getUserDetails();

      if (session.isLoggedIn) {
        setUser(savedUser);
      }

      setLoading(false);
    })();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const savedUser = await storage.getUserDetails();
      const savedPassword = await storage.getEncryptedPassword();

      if (!savedUser || !savedPassword) {
        return { status: false, message: LABELS.login_user_does_not_exist };
      }

      if (savedUser.email !== email) {
        return {
          status: false,
          message: ERROR.email.wrong,
        };
      }
      if (savedPassword !== password) {
        return {
          status: false,
          message: ERROR.password.incorrect_password,
        };
      }
      setIsLoggedIn(true);
      setUser(savedUser);
      await storage.saveUserSession();

      return {
        status: true,
        message: LABELS.login_successful,
        user: savedUser,
      };
    } catch (error) {
      return {
        status: false,
        message: 'Something went wrong during login',
      };
    }
  }, []);

  const signup = useCallback(
    async ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => {
      try {
        const newUser: User = { name, email };

        await storage.saveUserDetails(newUser);
        await storage.saveEncryptedPassword(password);

        return {
          status: true,
          message: 'Signup successful',
        };
      } catch (error) {
        console.error('Signup error:', error);

        return {
          status: false,
          message: 'Signup failed. Please try again.',
        };
      }
    },
    [],
  );

  const logout = useCallback(async () => {
    setIsLoggedIn(false);
    await storage.clearSession();
    setUser(null);
  }, []);

  const getCurrentSession = useCallback(async () => {
    const session = await storage.getUserSession();
    const savedUser = await storage.getUserDetails();

    const isLoggedIn = session?.isLoggedIn === true;

    return {
      isLoggedIn,
      user: isLoggedIn ? savedUser : null,
    };
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isLoggedIn,
      setIsLoggedIn,
      login,
      signup,
      logout,
      getCurrentSession,
    }),
    [user, loading, login, signup, logout, getCurrentSession, setIsLoggedIn],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
