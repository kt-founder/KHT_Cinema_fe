import axios from 'axios';

// Tạo một instance của axios với baseURL là API của bạn
const api = axios.create({
    baseURL: 'http://localhost:8080', // URL của backend server
});

// Thêm interceptor nếu bạn muốn tự động thêm JWT token vào request header
// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token') || sessionStorage.getItem('token');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

export default api;
