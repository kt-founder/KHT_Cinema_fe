import Admin_axios from "./Admin_Interceptors";
import User_axios from "./User_Interceptors";
import No_interceptors from "./No_interceptors";

const API = {
    // --------------- API ADMIN --------------------
    GetAllUser: () => Admin_axios.get("account/get-list-user"),
    GetAllAdmin: () => Admin_axios.get("account/get-all-admin"),
    DisableUser: (id) => Admin_axios.patch(`account/deleta/${id}`),
    // API CinemaHall
    GetAllCinemaHall: () => Admin_axios.get("/cinema-halls/get-all"),
    ChangeStatusCinemaHall: (id, isActive) =>
        Admin_axios.put(`/cinema-halls/change-status/${id}?isActive=${isActive}`),

    // --------------- API USER ---------------------
    GetMyInFor: () => User_axios.get("account/get-my-infor"),
    EditProfile: (data) => User_axios.patch("account/edit-profile", data),

    // ---------- API not request token -------------
    GetAllMovie: () => No_interceptors.get("movies/get-all"),
    GetMovieById: (id) => No_interceptors.get(`movies/get/${id}`), // Thêm API mới
    LoginByAdmin: (data) => No_interceptors.post("auth/login-admin", data),
    LoginByUser: (data) => No_interceptors.post("auth/login-user", data),
    SignUpUser: (data) => No_interceptors.post("auth/signup", data),
    ForgotPassword: (data) => No_interceptors.post("auth/forgot-password", data),
    UpdatePassword: (data) => No_interceptors.patch("auth/update-password", data),
    UpdateMovie: (id, data) => No_interceptors.put(`movies/update/${id}`, data),
    CreatMovie: (data) => No_interceptors.post("movies/create", data),
    DisableMovie: (id) => No_interceptors.delete(`movies/delete/${id}`),
    GetShowtimesByMovieId: (movieId) =>
        No_interceptors.get(`showtimes/user/get-by-movieid?movieId=${movieId}`), // Thêm API lấy lịch chiếu

    // ---------- API for Comments -------------------
    GetCommentsByMovie: (movieId) =>
        No_interceptors.get(`comments/movie/${movieId}`),
    AddComment: (userId, data) =>
        User_axios.post(`comments/add/${userId}`, data),
    ReplyToComment: (userId, parentCommentId, data) =>
        User_axios.post(`comments/reply/${userId}/${parentCommentId}`, data),
    DeleteComment: (commentId) =>
        User_axios.delete(`comments/delete/${commentId}`),

    // ---------- API for Seats ---------------------
    GetSeatsByShowtime: (showtimeId) =>
        No_interceptors.get(`seats/get-by-show-time/${showtimeId}`), // Thêm API lấy danh sách ghế
};

export default API;
