import axios from 'axios';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
// I'll only do this for temporary purpose because somehow, my env variable for frontend is not being read by vite
const API_BASE_URL = 'https://mern-crud-01p8.onrender.com';
console.log(API_BASE_URL)
const api = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;