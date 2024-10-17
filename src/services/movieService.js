import api from './api'; // Import instance axios từ file api.js

// Hàm lấy tất cả các phim từ API
export const getMovies = async () => {
  try {
    const response = await api.get('/movies/get-all');
    console.log('Dữ liệu phim nhận về:', response.data);
    return response.data;
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy danh sách phim:', error);
    throw error; // Để xử lý lỗi ở nơi khác nếu cần
  }
};
