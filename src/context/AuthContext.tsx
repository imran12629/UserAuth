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
  email: string;
  password: string;
  isLoggedIn: boolean;
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

  signup: (data: User) => Promise<{
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
      const savedUser = await storage.getUserDetails();
      const user = savedUser.find((user:User) => user.isLoggedIn === true);

      if (user.isLoggedIn) {
        setUser(user);
      }

      setLoading(false);
    })();
  }, []);

  const updateLoginStatus = (users: User[], emailToLogin: string) => {
    return users.map(
      user =>
        user.email === emailToLogin
          ? { ...user, isLoggedIn: true } // update this user
          : { ...user, isLoggedIn: false }, // optional: logout others
    );
  };

  const login = useCallback(async (email: string, password: string) => {
    try {
      const savedUsers = await storage.getUserDetails();
      const users = Array.isArray(savedUsers) ? savedUsers : [];
      const user = users.find(u => u.email === email);

      if (!user) {
        return { status: false, message: LABELS.login_user_does_not_exist };
      }
      const savedPassword = await storage.getEncryptedPassword(email);

      if (!savedPassword) {
        return { status: false, message: ERROR.password.incorrect_password };
      }

      if (savedPassword !== password) {
        return {
          status: false,
          message: ERROR.password.incorrect_password,
        };
      }

      const updatedUsers = updateLoginStatus(users, user.email);
      await storage.saveUserDetails(updatedUsers);

      setIsLoggedIn(true);
      setUser(user);
      await storage.saveUserSession();

      return {
        status: true,
        message: LABELS.login_successful,
        user,
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
      isLoggedIn = false,
    }: {
      name: string;
      email: string;
      password: string;
      isLoggedIn: boolean;
    }) => {
      try {
        const newUser: User = { name, email, password, isLoggedIn };

        const existingUsersRaw = await storage.getUserDetails();
        const existingUsers = Array.isArray(existingUsersRaw)
          ? existingUsersRaw
          : [];

        const updatedUsers = [...existingUsers, newUser];

        await storage.saveUserDetails(updatedUsers);

        await storage.saveEncryptedPassword(email, password);

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
    const savedUser = await storage.getUserDetails();
    const loggedInUser: User = savedUser.find(
      (user: User) => user.isLoggedIn === true,
    );
    setUser(loggedInUser);
    const isLoggedIn = loggedInUser?.isLoggedIn === true;

    return {
      isLoggedIn,
      user: loggedInUser,
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
