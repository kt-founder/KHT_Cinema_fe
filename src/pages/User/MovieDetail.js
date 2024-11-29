import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "../../components/StylesComponent/Navbar.css";
import "../styles/MovieDetail.css";
import { Rate, Button, Input, notification } from "antd";
import API from "../../Confligs/Api";
import moment from "moment";
import LoadingComponent from "../../components/LoadingComponent";

const { TextArea } = Input;

const MovieDetail = () => {
    const { id: movieId } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [comments, setComments] = useState([]);
    const [showtimes, setShowtimes] = useState([]);
    const [groupedShowtimes, setGroupedShowtimes] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedShowtime, setSelectedShowtime] = useState(null);
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [newComment, setNewComment] = useState("");
    const [newRating, setNewRating] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        API.GetMovieById(movieId)
            .then((response) => setMovie(response.data.data))
            .catch((error) => console.error("Error fetching movie details:", error))
            .finally(() => setIsLoading(false));
        fetchComments();
        fetchShowtimes();
    }, [movieId]);

    const fetchComments = () => {
        API.GetCommentsByMovie(movieId)
            .then((response) => setComments(response.data.data || []))
            .catch((error) => console.error("Error fetching comments:", error));
    };

    const fetchShowtimes = () => {
        API.GetShowtimesByMovieId(movieId)
            .then((response) => {
                const showtimesData = response.data.data || [];
                const now = moment(); // Thời điểm hiện tại

                // Lọc các suất chiếu chưa bắt đầu và sắp xếp chúng theo thời gian
                const filteredShowtimes = showtimesData
                    .filter((showtime) => moment(showtime.startTime).isSameOrAfter(now))
                    .sort((a, b) => moment(a.startTime).diff(moment(b.startTime))); // Sắp xếp theo thời gian

                // Nhóm các suất chiếu theo ngày
                const grouped = filteredShowtimes.reduce((acc, showtime) => {
                    const date = moment(showtime.startTime).format("YYYY-MM-DD");
                    if (!acc[date]) acc[date] = [];
                    acc[date].push(showtime);
                    return acc;
                }, {});

                setGroupedShowtimes(grouped); // Lưu vào state
                setShowtimes(filteredShowtimes); // Lưu danh sách đã lọc và sắp xếp

                // Chọn ngày đầu tiên trong danh sách làm ngày mặc định
                const firstDate = Object.keys(grouped)[0];
                setSelectedDate(firstDate);
            })
            .catch((error) => console.error("Error fetching showtimes:", error));
    };




    const fetchSeats = (showtimeId) => {
        API.GetSeatsByShowtime(showtimeId)
            .then((response) => setSeats(response.data.data || []))
            .catch((error) => console.error("Error fetching seats:", error));
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
        setSelectedShowtime(null); // Reset selected showtime when changing date
    };

    const handleShowtimeClick = (showtime) => {
        setSelectedShowtime(showtime);
        fetchSeats(showtime.id);
        setSelectedSeats([]);
        setTotalPrice(0);
    };

    const handleSeatClick = (seat) => {
        if (seat.seatStatus === "unavailable") return;

        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter((s) => s.seatId !== seat.seatId));
            setTotalPrice(totalPrice - seat.seatPrice);
        } else {
            setSelectedSeats([...selectedSeats, seat]);
            setTotalPrice(totalPrice + seat.seatPrice);
        }
    };

    const addComment = async () => {
        if (!newComment || newRating === 0) {
            notification.warning({ message: "Please add a comment and rating" });
            return;
        }

        try {
            const userId = sessionStorage.getItem("userId");
            const username = sessionStorage.getItem("username");

            if (!userId || !username) {
                notification.error({ message: "You need to login to comment" });
                navigate("/login");
                return;
            }

            const commentRequest = {
                movieId: movieId.toString(),
                content: newComment,
                username,
                parentCommentId: null,
                rate: newRating,
            };

            await API.AddComment(userId, commentRequest);
            notification.success({ message: "Comment added successfully" });
            setNewComment("");
            setNewRating(0);
            fetchComments();
        } catch (error) {
            console.error("Error adding comment:", error);
            notification.error({ message: "Failed to add comment" });
        }
    };

    if (isLoading) {
        return <LoadingComponent />;
    }
    return (
        <div>
            <Navbar />
            <div className="movie-detail-container">
                <div className="movie-detail-content">
                    <div className="movie-detail-image">
                        <img src={movie.image} alt={movie.title || "Movie"}/>
                    </div>
                    <div className="movie-detail-info">
                        <h1>{movie.title || "N/A"}</h1>
                        <Rate disabled value={movie.averageRating || 0}/>
                        <p>{movie.description || "No description available."}</p>
                        <p><strong>Đạo diễn:</strong> {movie.director || "N/A"}</p>
                        <p><strong>Diễn viên:</strong> {movie.actors || "N/A"}</p>
                        <p><strong>Thể loại:</strong> {movie.genre || "N/A"}</p>
                        <p><strong>Thời lượng:</strong> {movie.duration || "N/A"}</p>
                        <p><strong>Ngày khởi chiếu:</strong> {movie.releaseDate || "N/A"}</p>
                    </div>
                </div>

                <div className="showtimes-section">
                    <h2>Showtimes</h2>
                    <div className="date-selector">
                        {Object.keys(groupedShowtimes).map((date) => (
                            <button
                                key={date}
                                onClick={() => handleDateClick(date)}
                                style={{
                                    background: selectedDate === date ? "#4caf50" : "#f1f1f1",
                                    color: selectedDate === date ? "#fff" : "#333",
                                }}
                            >
                                {moment(date).format("DD-MM")}
                            </button>
                        ))}
                    </div>
                    <div className="time-selector">
                        {selectedDate &&
                            groupedShowtimes[selectedDate]?.map((showtime) => (
                                <button
                                    key={showtime.id}
                                    onClick={() => handleShowtimeClick(showtime)}
                                    style={{
                                        background: selectedShowtime?.id === showtime.id ? "#ff5722" : "#e0e0e0",
                                        color: selectedShowtime?.id === showtime.id ? "#fff" : "#333",
                                    }}
                                >
                                    {moment(showtime.startTime).format("HH:mm")}
                                </button>
                            ))}
                    </div>
                </div>

                {selectedShowtime && (
                    <div className="seats-section">
                        <h3>Seats for Showtime: {moment(selectedShowtime.startTime).format("HH:mm")} - {selectedShowtime.nameRoom}</h3>
                        <div className="seat-layout">
                            {seats.map((seat) => (
                                <div
                                    style={{backgroundColor: seat.seatStatus === 'sold' ? '#551717' : ''
                                        , pointerEvents:seat.seatStatus === 'sold' ? 'none' : 'auto',
                                        color:seat.seatStatus === 'sold' ? 'white' : 'black'
                                        ,cursor:seat.seatStatus === 'sold' ? 'not-allowed' : 'pointer',
                                    userSelect:seat.seatStatus === 'sold' ? 'none' : ''}}
                                    key={seat.seatId}
                                    className={`seat ${
                                        selectedSeats.some((s) => s.seatId === seat.seatId)
                                            ? "selected"
                                            : seat.typeName.toLowerCase()
                                    }`}
                                    data-info={`Ghế: ${seat.seatNumber}, Giá: ${seat.seatPrice}đ`}
                                    onClick={() => handleSeatClick(seat)}
                                >
                                    {seat.seatNumber}
                                </div>
                            ))}
                        </div>

                        <div className="seat-info">
                            <p className="selected-seats">
                                Ghế đã chọn:{" "}
                                {selectedSeats.length > 0
                                    ? selectedSeats.map((seat) => seat.seatNumber).join(", ")
                                    : "Chưa chọn ghế nào"}
                            </p>
                            <p className="total-price">Tổng tiền: {totalPrice.toLocaleString("vi-VN")} đ</p>
                        </div>

                        {/* Legend Section */}
                        <div className="legend">
                            <div className="legend-item">
                                <div className="box unavailable"></div>
                                <span>Đã đặt</span>
                            </div>
                            <div className="legend-item">
                                <div className="box selected"></div>
                                <span>Ghế bạn chọn</span>
                            </div>
                            <div className="legend-item">
                                <div className="box standard"></div>
                                <span>Ghế thường</span>
                            </div>
                            <div className="legend-item">
                                <div className="box vip"></div>
                                <span>Ghế VIP</span>
                            </div>
                        </div>
                    </div>
                )}
                {selectedSeats.length > 0 && (
                    <div className="checkout">
                        <Button
                            type="primary"
                            style={{
                                backgroundColor: "#ff5722",
                                borderColor: "#ff5722",
                                color: "#fff",
                                marginTop: "20px",
                            }}
                            onClick={() => {
                                // Kiểm tra trạng thái đăng nhập
                                const username = sessionStorage.getItem("userName");
                                if (!username) {
                                    // Hiển thị thông báo và chuyển hướng đến trang đăng nhập
                                    notification.error({
                                        message: "Bạn cần đăng nhập để thực hiện thanh toán.",
                                    });
                                    navigate("/login");
                                } else {
                                    // Chuyển sang giao diện thanh toán
                                    navigate("/check-out", {
                                        state: { selectedSeats,
                                            totalPrice,
                                            showtimeId: selectedShowtime.id,
                                            username,
                                            roomName: selectedShowtime.nameRoom,
                                            roomId: selectedShowtime.roomId,
                                            startTime: moment(selectedShowtime.startTime).format("HH:mm"),
                                            endTime: moment(selectedShowtime.endTime).format("HH:mm"),
                                            date:moment(selectedShowtime.startTime).format("DD-MM"),
                                            movie: movie.title
                                        },
                                    });
                                }
                            }}
                        >
                            Thanh toán
                        </Button>
                    </div>
                )}
                <div className="comments-section">
                    <h2>Comments</h2>
                    {comments.map((comment) => (
                        <div key={comment.id} className="comment-item">
                            <p className="fw-bold">{comment.username || "Anonymous"}</p>
                            <Rate disabled defaultValue={comment.rate || 0}/>
                            <p>{comment.content}</p>
                        </div>
                    ))}
                    <div className="add-comment">
                        <h3>Add a Comment</h3>
                        <TextArea
                            rows={3}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add your comment here"
                        />
                        <Rate onChange={(value) => setNewRating(value)} value={newRating}/>
                        <Button type="primary" onClick={addComment} style={{marginTop: "10px"}}>
                            Submit Comment
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
