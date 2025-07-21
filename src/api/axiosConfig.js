// src/api/axiosConfig.js
import axios from 'axios';

const authBaseURL = process.env.REACT_APP_AUTH_URL || 'http://localhost:3001';
const articlesBaseURL = process.env.REACT_APP_ARTICLES_URL || 'http://localhost:3002';
const categoriesBaseURL = process.env.REACT_APP_CATEGORIES_URL || 'http://localhost:3003';

export const authApi = axios.create({ baseURL: authBaseURL });
export const articlesApi = axios.create({ baseURL: articlesBaseURL });
export const categoriesApi = axios.create({ baseURL: categoriesBaseURL });

// Configurar interceptores para manejo de 401
export function setupAxiosInterceptors(navigate) {
  [authApi, articlesApi, categoriesApi].forEach(api => {
    api.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );
  });
}

