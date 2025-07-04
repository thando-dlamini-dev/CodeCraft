import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5500', //backend URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // if you're using cookies/sessions
});

export default api;