import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "../../components/StylesComponent/Navbar.css";
import "../styles/MovieDetail.css";
import { Rate, Button, Input, notification } from "antd";
import API from "../../Confligs/Api";
import moment from "moment";

const { TextArea } = Input;

const MovieDetail = () => {
    const { id: movieId } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [comments, setComments] = useState([]);
    const [showtimes, setShowtimes] = useState([]);
    const [selectedShowtime, setSelectedShowtime] = useState(null);
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [newComment, setNewComment] = useState("");
    const [newRating, setNewRating] = useState(0);

    useEffect(() => {
        API.GetMovieById(movieId)
            .then((response) => setMovie(response.data.data))
            .catch((error) => console.error("Error fetching movie details:", error));

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
                const today = moment().startOf("day");
                const filteredShowtimes = showtimesData.filter((showtime) =>
                    moment(showtime.startTime).isSameOrAfter(today)
                );
                setShowtimes(filteredShowtimes);
            })
            .catch((error) => console.error("Error fetching showtimes:", error));
    };

    const fetchSeats = (showtimeId) => {
        API.GetSeatsByShowtime(showtimeId)
            .then((response) => setSeats(response.data.data || []))
            .catch((error) => console.error("Error fetching seats:", error));
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

    if (!movie) {
        return <div>Loading movie details...</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="movie-detail-container">
                <div className="movie-detail-content">
                    <div className="movie-detail-image">
                        <img src={movie.image} alt={movie.title || "Movie"} />
                    </div>
                    <div className="movie-detail-info">
                        <h1>{movie.title || "N/A"}</h1>
                        <Rate disabled value={movie.averageRating || 0} />
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
                        {showtimes.map((showtime) => (
                            <button
                                key={showtime.id}
                                onClick={() => handleShowtimeClick(showtime)}
                                style={{
                                    background: selectedShowtime?.id === showtime.id ? "white" : "transparent",
                                }}
                            >
                                {moment(showtime.startTime).format("DD-MM dddd HH:mm")}
                            </button>
                        ))}
                    </div>
                </div>

                {selectedShowtime && (
                    <div className="seats-section">
                        <h3>Seats for Showtime: {moment(selectedShowtime.startTime).format("HH:mm")}</h3>
                        <div className="seat-layout">
                            {seats.map((seat) => (
                                <button1
                                    key={seat.seatId}
                                    className={`seat ${
                                        selectedSeats.some((s) => s.seatId === seat.seatId)
                                            ? "selected"
                                            : seat.typeName.toLowerCase()
                                    }`}
                                    data-info={`Ghế: ${seat.seatNumber}, Giá: ${seat.seatPrice}đ`}
                                    onClick={() => handleSeatClick(seat)}
                                    disabled={seat.seatStatus === "unavailable"}
                                >
                                    {seat.seatNumber}
                                </button1>
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
                        <Button type="primary" onClick={addComment} style={{marginTop: "10px" }}>
                            Submit Comment
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
