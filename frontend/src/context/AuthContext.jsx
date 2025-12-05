import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext();

const normalizeUser = (userData) => {
  if (!userData) return null;
  return { ...userData, id: userData.id || userData._id };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? normalizeUser(JSON.parse(stored)) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    const initialize = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get('/auth/me');
        const normalized = normalizeUser(data.user);
        setUser(normalized);
        localStorage.setItem('user', JSON.stringify(normalized));
      } catch (error) {
        console.error('Profile error:', error.message);
        logout();
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, [token]);

  const persistSession = ({ user: userData, token: newToken }) => {
    const normalized = normalizeUser(userData);
    setUser(normalized);
    setToken(newToken);
    localStorage.setItem('user', JSON.stringify(normalized));
    localStorage.setItem('token', newToken);
  };

  const handleAuthRequest = async (requestPromise) => {
    setAuthError('');
    try {
      const { data } = await requestPromise;
      persistSession(data);
    } catch (error) {
      const message = error?.response?.data?.message || 'Habaye ikibazo mu kwemeza umwirondoro.';
      setAuthError(message);
      throw error;
    }
  };

  const login = (credentials) => handleAuthRequest(api.post('/auth/login', credentials));

  const register = (payload) => handleAuthRequest(api.post('/auth/register', payload));

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const value = {
    user,
    token,
    loading,
    authError,
    login,
    register,
    logout,
    isAuthenticated: Boolean(user)
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
