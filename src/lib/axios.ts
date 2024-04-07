import axios, { AxiosRequestConfig } from 'axios';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth'; 
import { getRefreshToken } from './authService';


const BASE_URL = "http://localhost:8080/api/v1";

export default axios.create({
  baseURL: BASE_URL,
});


export const axiosAuth = axios.create({
  baseURL: BASE_URL,
});


axiosAuth.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const session: Session | null = await getSession();
  const token: string | undefined = session?.user?.accessToken;

  if (token) {
    // Ensure config.headers is defined
    config.headers = config.headers || {}; 
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config as any; // Cast config to any
}, function (error) {
  return Promise.reject(error);
});


let isRefreshing = false;
let refreshSubscribers = [];

axiosAuth.interceptors.response.use(response => {
  // If the response is successful, just return it
  return response;
}, async error => {
  // If the error status is 401, try to refresh the token
  if (error.response && error.response.status === 401) {
    const session = await getSession();
    
    if (session && session.user) {
      const refreshToken = session.user.refreshToken;

      if (refreshToken) {
        // Check if a token refresh is already in progress
        if (!isRefreshing) {
          isRefreshing = true;

          try {
            // Call your refreshToken function here. This will depend on how you have implemented it.
            const newTokens = await getRefreshToken(refreshToken);
            
            // Update the session with the new tokens
            if (newTokens.accessToken && newTokens.refreshToken) {
              session.user.accessToken = newTokens.accessToken;
              session.user.refreshToken = newTokens.refreshToken;

              // Retry the original request with the new token
              const config = error.config;
              config.headers['Authorization'] = `Bearer ${newTokens.accessToken}`;
              
              // Resolve all the pending requests with the new token
              refreshSubscribers?.forEach(callback => callback(newTokens.accessToken));
              refreshSubscribers = [];

              return axiosAuth(config);
            } else {
              // Handle the case where the refreshToken function did not return valid tokens
              return Promise.reject(new Error('Token refresh failed.'));
            }
          } catch (refreshError) {
            // If refreshing the token also fails, reject the original request with the refresh error
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        } else {
          // Token refresh is already in progress, queue the request to be retried after token refresh
          return new Promise((resolve) => {
            refreshSubscribers.push((token:string) => {
              const config = error.config;
              config.headers['Authorization'] = `Bearer ${token}`;
              resolve(axiosAuth(config));
            });
          });
        }
      }
    }
  }

  // If the error is due to other reasons, reject the request with the original error
  return Promise.reject(error);
});