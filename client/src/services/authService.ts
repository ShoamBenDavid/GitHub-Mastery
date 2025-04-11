import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;  // Optional since it's only used in the form
  role: 'student' | 'lecturer' | 'admin';
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

export interface UpdateProfileData {
  username?: string;
  email?: string;
  password?: string;
  avatar?: string;
}

// Function to get auth header with token
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

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

  getProfile: async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/profile`, getAuthHeader());
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch profile');
    }
  },

  updateProfile: async (data: UpdateProfileData) => {
    try {
      // Log the incoming data
      console.log('Update request fields:', Object.keys(data));
      
      // Create a new object for sending
      const requestData: Record<string, string> = {};
      
      // Add only the fields we want to update
      if (typeof data.username === 'string') {
        requestData.username = data.username;
      }
      
      if (typeof data.email === 'string') {
        requestData.email = data.email;
      }
      
      if (typeof data.password === 'string') {
        requestData.password = data.password;
      }
      
      // Special handling for avatar to ensure it's valid Base64
      if (typeof data.avatar === 'string' && data.avatar) {
        const avatarSizeKB = Math.round(data.avatar.length/1024);
        console.log(`Avatar size: ${avatarSizeKB}KB`);
        
        // Size check
        if (data.avatar.length > 550000) {
          throw new Error('Avatar exceeds size limit (550KB). Please try a smaller image.');
        }
        
        // Validate basic structure of image data URL
        if (data.avatar.startsWith('data:image/') && data.avatar.includes('base64,')) {
          requestData.avatar = data.avatar;
        } else if (data.avatar.match(/^https?:\/\//)) {
          // Allow regular URLs
          requestData.avatar = data.avatar;
        } else {
          throw new Error('Invalid avatar format. Must be a data URL or web URL.');
        }
      }
      
      console.log('Sending fields:', Object.keys(requestData));
      
      // Make the API request
      const response = await axios.patch(
        `${API_URL}/auth/profile`, 
        requestData, 
        getAuthHeader()
      );
      
      // Handle the response
      if (response.data.user) {
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        const updatedUser = { ...currentUser, ...response.data.user };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Profile update error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || error.response?.data?.details || 'Failed to update profile');
    }
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