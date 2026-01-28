import { ERRORS } from '@/common/constants';
import axios, { AxiosRequestConfig } from 'axios';

// change to use only env
const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:5181';

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === ERRORS.UNAUTHORIZED) {
      // remove from userStore
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  },
);

export const axiosInstance = (config: AxiosRequestConfig) => {
  return instance(config);
};

export default instance;
