import axios from 'axios';


const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL,
});

// Función para configurar interceptor 
export function setupAxiosInterceptors(navigate) {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
      return Promise.reject(error);
    }
  );
}

export default api;
