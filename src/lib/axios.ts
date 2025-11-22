import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { setupAxiosInterceptor } from './errorHandler';

/**
 * Default Axios configuration
 */
const defaultConfig: AxiosRequestConfig = {
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Create configured Axios instance with error handling
 */
export function createAxiosInstance(config?: AxiosRequestConfig): AxiosInstance {
  const instance = axios.create({
    ...defaultConfig,
    ...config,
  });

  // Setup error interceptor
  setupAxiosInterceptor(instance);

  // Request interceptor for adding common headers
  instance.interceptors.request.use(
    (config) => {
      // You can add common headers here (e.g., auth tokens)
      // const token = localStorage.getItem('auth_token');
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`;
      // }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
}

/**
 * Default Axios instance with error handling
 */
export const axiosInstance = createAxiosInstance();

/**
 * Export axios for backward compatibility
 */
export { axios };
export default axiosInstance;
