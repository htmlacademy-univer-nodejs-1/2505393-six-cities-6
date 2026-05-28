import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getToken } from './token';

const BACKEND_URL = 'http://localhost:4000';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  // Логгирование запросов и ответов для отладки
  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    console.log('[API Request]', config.method?.toUpperCase(), config.url);
    if (config.data) {
      console.log('[API Request Data]', config.data);
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      console.log('[API Response]', response.status, response.statusText);
      console.log('[API Response Data]', response.data);
      return response;
    },
    (error) => {
      console.error('[API Error]', error.message);
      if (error.response) {
        console.error(
          '[API Error Response]',
          error.response.status,
          error.statusText
        );
        console.error('[API Error Response Data]', error.response.data);
      } else if (error.request) {
        console.error('[API Error Request]', error.request);
      }
      return Promise.reject(error);
    }
  );

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  return api;
};
