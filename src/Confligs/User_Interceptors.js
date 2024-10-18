// src/axiosConfig.js
import axios from 'axios';

// Tạo một instance của axios
const User_axios = axios.create({
    baseURL: 'https://localhost:8080/', // Đổi thành API của bạn
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor cho request
User_axios.interceptors.request.use(
    (config) => {
        // Lấy token từ localStorage
        const token = sessionStorage.getItem("HKT_ACCESS_TOKEN_USER");

        // Nếu không thuộc public routes và cần token, thêm token vào header
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
User_axios.interceptors.response.use(
    (response) => {
        // Nếu request thành công, trả về response như bình thường
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Kiểm tra nếu lỗi là 401 hoặc 403 và request chưa được thử lại
        if ((error.response.status === 401 || error.response.status === 403) && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Thực hiện request refresh token
                const refreshToken = localStorage.getItem("HKT_REFRESH_TOKEN_USER");
                const response = await User_axios.post('/refresh-token', {
                    token: refreshToken,
                });

                // Lưu token mới vào localStorage
                const newToken = response.data.data.access_token;
                sessionStorage.setItem("HKT_ACCESS_TOKEN_USER", newToken);

                // Cập nhật token vào header cho request ban đầu và thử lại request
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return User_axios(originalRequest);

            } catch (refreshError) {
                // Nếu refresh token không thành công, có thể chuyển hướng người dùng đến trang đăng nhập
                console.error('Refresh token failed, redirecting to login...');
                window.location.href = '/login'; // Hoặc bất kỳ URL nào cho trang đăng nhập của bạn
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default User_axios;
