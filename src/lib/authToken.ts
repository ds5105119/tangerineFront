import { LoginResponseDto } from '@/types/api/accounts';
import { logout } from '@/hooks/accounts/account';

const AUTH_STORAGE_KEY = 'authData';

export const setAuth = (authData: LoginResponseDto): void => {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
  } catch (error) {
    console.error('Error saving auth data to localStorage:', error);
  }
};

export const getAuth = (): LoginResponseDto | null => {
  try {
    const authDataString = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!authDataString) return null;
    return JSON.parse(authDataString) as LoginResponseDto;
  } catch (error) {
    console.error('Error getting auth data from localStorage:', error);
    return null;
  }
};

export const updateAuth = (access: string) => {
  try {
    const authData = getAuth();
    if (authData) {
      authData.access = access;
      setAuth(authData);
    }
  } catch (error) {
    console.error('Failed to update auth:', error);
  }
};

export const clearAuth = (): void => {
  try {
    logout();
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing auth data from localStorage:', error);
  }
};
