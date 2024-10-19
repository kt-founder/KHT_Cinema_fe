// src/axiosConfig.js
import axios from 'axios';
import No_interceptors from "./No_interceptors";

let refreshTokenPromise = null; // Biến lưu trữ Promise khi refresh token đang diễn ra

const Admin_axios = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor cho request
Admin_axios.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("HKT_ACCESS_TOKEN_ADMIN");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor cho response
Admin_axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Kiểm tra nếu lỗi là 401 hoặc 403 và request chưa được thử lại
        if ((error.response.status === 401 || error.response.status === 403) && !originalRequest._retry) {
            originalRequest._retry = true;

            // Nếu chưa có refresh token Promise, bắt đầu quá trình refresh
            if (!refreshTokenPromise) {
                refreshTokenPromise = (async () => {
                    try {
                        const refreshToken = localStorage.getItem("HKT_REFRESH_TOKEN_ADMIN");

                        // Thực hiện yêu cầu refresh token
                        const response = await No_interceptors.post('/auth/refresh-token', {
                            input: refreshToken,
                        });

                        const newToken = response.data.data.access_token;
                        sessionStorage.setItem("HKT_ACCESS_TOKEN_ADMIN", newToken);

                        // Hoàn tất quá trình refresh, trả về token mới
                        return newToken;

                    } catch (refreshError) {
                        alert("You must login again ")
                        // Nếu refresh token không thành công, chuyển hướng đến trang đăng nhập
                        console.error('Refresh token failed, redirecting to login...');
                        sessionStorage.removeItem("HKT_ACCESS_TOKEN_ADMIN")
                        window.location.href = '/admin';
                        return Promise.reject(refreshError);
                    } finally {
                        refreshTokenPromise = null; // Đặt lại Promise sau khi refresh hoàn tất
                    }
                })();
            }

            // Đợi Promise được resolve và sử dụng token mới
            const newToken = await refreshTokenPromise;
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return Admin_axios(originalRequest);
        }

        return Promise.reject(error);
    }
);

export default Admin_axios;
