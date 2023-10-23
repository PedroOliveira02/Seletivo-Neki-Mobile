import axios from 'axios';

const api = axios.create({
  baseURL: 'https://f400-2804-2ccc-1-fd00-3081-b0ab-4f6c-f94a.ngrok-free.app',
  timeout: 10000, 
});

export default api;
