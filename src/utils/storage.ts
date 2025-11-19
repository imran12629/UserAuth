import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';

export const STORAGE_KEYS = {
  LOGGED_IN: 'IS_LOGGED_IN',
  USER: 'USER_DATA',
  PASSWORD: 'ENCRYPTED_PASSWORD',
};

export const storage = {

  saveUserSession: async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.LOGGED_IN, 'true');
    } catch (err) {
      console.error('Error saving user session:', err);
    }
  },

  getUserSession: async () => {
    try {
      const loggedIn = await AsyncStorage.getItem(STORAGE_KEYS.LOGGED_IN);
      return { isLoggedIn: loggedIn === 'true' };
    } catch (err) {
      console.error('Error loading user session:', err);
      return { user: null, isLoggedIn: false };
    }
  },

  saveUserDetails: async (user: any) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (err) {
      console.error('Error saving user details:', err);
    }
  },

  getUserDetails: async () => {
    try {
      const user = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      return user ? JSON.parse(user) : null;
    } catch (err) {
      console.error('Error loading user details:', err);
      return null;
    }
  },

  saveEncryptedPassword: async (email:string,password: string) => {
    try {
      await EncryptedStorage.setItem(
        email,
        password 
      );
    } catch (err) {
      console.error('Error saving encrypted password:', err);
    }
  },

  getEncryptedPassword: async (email:string) => {
    try {
      return await EncryptedStorage.getItem(email);
    } catch (err) {
      console.error('Error fetching encrypted password:', err);
      return null;
    }
  },

  clearSession: async () => {
    try {
      await AsyncStorage.removeItem(
        STORAGE_KEYS.LOGGED_IN
      );
    } catch (err) {
      console.error('Error clearing session:', err);
    }
  },
};
