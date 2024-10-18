// src/axiosConfig.js
import axios from 'axios';

// Tạo một instance của axios
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/', // Đổi thành API của bạn
    headers: {
        'Content-Type': 'application/json',
    },
});


// Interceptor cho request
axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
