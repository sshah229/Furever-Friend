import axios from 'axios';

axios.defaults.baseURL = 'https://frontend-take-home-service.fetch.com';
axios.defaults.withCredentials = true;

export interface LoginPayload { name: string; email: string; }
export async function login(payload: LoginPayload) {
  return axios.post('/auth/login', payload);
}
export async function logout() {
  return axios.post('/auth/logout');
}
