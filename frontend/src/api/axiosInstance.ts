import { ERRORS } from '@/common/constants';
import axios from 'axios';

const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT ?? '5181'
const API_BASE_URL = `http://localhost:${BACKEND_PORT}`;

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

export const axiosInstance = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  const response = await instance.request<T>({
    url,
    method: options?.method,
    headers: options?.headers as any,
    data: options?.body, // 🔥 body -> data (axios koristi data)
  });

  return response as T;
};

export default instance;
