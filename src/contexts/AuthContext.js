import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../utils/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    if (token && userRole) {
      // Set default axios header
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser({ token, role: userRole });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      console.log('Login response:', response.data);
      
      // Kiểm tra cấu trúc response
      if (!response.data.data || !response.data.data.access_token) {
        console.error('Invalid response structure:', response.data);
        return { success: false };
      }

      const { access_token } = response.data.data;
      const role = response.data.data.employee?.role;

      console.log('Token:', access_token);
      console.log('Role:', role);

      if (!role) {
        console.error('Role not found in response');
        return { success: false };
      }

      localStorage.setItem('token', access_token);
      localStorage.setItem('userRole', role);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      setUser({ token: access_token, role });
      return { success: true, role };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    delete axiosInstance.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
