import api from './api';

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    if (error.code === 'ERR_NETWORK' || error.response?.status === 404) {
      console.warn('Backend offline! Using localStorage mock DB.');
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const users = JSON.parse(localStorage.getItem('mockUsers') || '[]');
          const user = users.find(u => u.email === email && u.password === password);
          if (user) resolve({ name: user.name, email: user.email, token: 'fake-jwt-' + Date.now() });
          else if (email === 'test@test.com' && password === 'password123') resolve({ name: 'Test User', email, token: 'fake-jwt-token' });
          else reject(new Error('Invalid credentials. Check mock DB or register a new user.'));
        }, 500);
      });
    }
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    if (error.code === 'ERR_NETWORK' || error.response?.status === 404) {
      console.warn('Backend offline! Using localStorage mock DB.');
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const users = JSON.parse(localStorage.getItem('mockUsers') || '[]');
          if (users.find(u => u.email === userData.email)) return reject({ response: { data: { message: 'Email already registered.' } } });
          users.push(userData);
          localStorage.setItem('mockUsers', JSON.stringify(users));
          resolve({ success: true, message: 'Mock registration successful' });
        }, 500);
      });
    }
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const response = await api.get('/user/profile');
    return response.data;
  } catch (error) {
    if (error.code === 'ERR_NETWORK' || error.response?.status === 404) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
           const storedUserStr = sessionStorage.getItem('user') || localStorage.getItem('user');
           if (storedUserStr) resolve(JSON.parse(storedUserStr));
           else reject(new Error('Invalid mock session'));
        }, 300);
      });
    }
    throw error;
  }
};
