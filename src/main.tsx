import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import axios from 'axios';

axios.defaults.withCredentials = true;
// axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'https://pinggu.com' : 'http://localhost:8080';
axios.defaults.baseURL = import.meta.env.VITE_HOST;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
