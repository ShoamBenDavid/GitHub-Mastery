import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;  // Optional since it's only used in the form
  role: 'student' | 'lecturer';
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  password: string;
}

export const authService = {
  register: async (data: RegisterData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  login: async (data: LoginData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getCurrentUser: () => {
    const token = localStorage.getItem('token');
    if (token) {
      // You can decode the JWT token here if needed
      return token;
    }
    return null;
  },

  forgotPassword: async (data: ForgotPasswordData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to send password reset email');
    }
  },

  resetPassword: async (token: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/reset-password/${token}`, { password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to reset password');
    }
  },
}; 