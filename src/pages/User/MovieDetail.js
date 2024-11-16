import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "../../components/StylesComponent/Navbar.css";
import "../styles/MovieDetail.css";
import { Rate, Button, Input, notification, Modal } from "antd";
import API from "../../Confligs/Api";
import moment from "moment";

const { TextArea } = Input;

const MovieDetail = () => {
    const { id: movieId } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [comments, setComments] = useState([]);
    const [showtimes, setShowtimes] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [newComment, setNewComment] = useState("");
    const [newRating, setNewRating] = useState(0);
    const [replyCommentId, setReplyCommentId] = useState(null);
    const [replyContent, setReplyContent] = useState("");
    const [isReplyModalVisible, setIsReplyModalVisible] = useState(false);

    useEffect(() => {
        // Fetch movie details
        API.GetMovieById(movieId)
            .then((response) => setMovie(response.data.data))
            .catch((error) => console.error("Error fetching movie details:", error));

        fetchComments();
        fetchShowtimes();
    }, [movieId]);

    const fetchComments = () => {
        API.GetCommentsByMovie(movieId)
            .then((response) => {
                const sortedComments = (response.data.data || []).sort(
                    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
                );
                setComments(sortedComments);
            })
            .catch((error) => console.error("Error fetching comments:", error));
    };


    const fetchShowtimes = () => {
        API.GetShowtimesByMovieId(movieId)
            .then((response) => {
                const showtimesData = response.data.data;
                const today = moment().startOf("day");
                const filteredShowtimes = showtimesData.filter((showtime) => {
                    const showtimeDate = moment(showtime.startTime).startOf("day");
                    return showtimeDate.isSameOrAfter(today);
                });
                const sortedShowtimes = filteredShowtimes.sort((a, b) => {
                    return new Date(a.startTime) - new Date(b.startTime);
                });
                setShowtimes(sortedShowtimes);
            })
            .catch((error) => console.error("Error fetching showtimes:", error));
    };

    const getUserInfo = async () => {
        try {
            const response = await API.GetMyInFor();
            const fetchedUserId = response.data.data.id;
            const fetchedUsername = response.data.data.username;
            sessionStorage.setItem("userId", fetchedUserId);
            sessionStorage.setItem("username", fetchedUsername);
            return { userId: fetchedUserId, username: fetchedUsername };
        } catch (error) {
            console.error("Error fetching user info:", error);
            notification.error({ message: "Failed to fetch user info" });
            throw error;
        }
    };

    const handleUserAuth = async () => {
        const token = sessionStorage.getItem("HKT_ACCESS_TOKEN_USER");
        if (!token) {
            notification.error({ message: "You need to login to perform this action" });
            navigate("/login");
            return null;
        }

        const storedUserId = sessionStorage.getItem("userId");
        const storedUsername = sessionStorage.getItem("username");

        if (storedUserId && storedUsername) {
            return { userId: storedUserId, username: storedUsername };
        } else {
            return await getUserInfo();
        }
    };

    const addComment = async () => {
        if (!newComment || newRating === 0) {
            notification.warning({ message: "Please add a comment and rating" });
            return;
        }

        try {
            const userInfo = await handleUserAuth();
            if (!userInfo) return;

            const commentRequest = {
                movieId: movieId.toString(),
                content: newComment,
                username: userInfo.username,
                parentCommentId: null,
                rate: newRating,
            };

            await API.AddComment(userInfo.userId, commentRequest);
            notification.success({ message: "Comment added successfully" });
            setNewComment("");
            setNewRating(0);
            fetchComments();
        } catch (error) {
            console.error("Error adding comment:", error);
            notification.error({ message: "Failed to add comment" });
        }
    };

    const submitReply = async () => {
        if (!replyContent) {
            notification.warning({ message: "Please add reply content" });
            return;
        }

        try {
            const userInfo = await handleUserAuth();
            if (!userInfo) return;

            const replyRequest = {
                movieId: movieId.toString(),
                content: replyContent,
                parentCommentId: replyCommentId,
                rate: 0, // Không cần đánh giá cho reply
            };

            await API.ReplyToComment(userInfo.userId, replyCommentId, replyRequest);
            notification.success({ message: "Reply added successfully" });
            setReplyContent("");
            setIsReplyModalVisible(false);
            fetchComments();
        } catch (error) {
            console.error("Error adding reply:", error);
            notification.error({ message: "Failed to add reply" });
        }
    };

    const filteredShowtimes = showtimes.filter((showtime) =>
        moment(showtime.startTime).isSame(selectedDate, "day")
    );

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const renderComments = (comments) => {
        return comments.map((comment) => (
            <div key={comment.id} className="comment-item">
                <p className="fw-bold">
                    {comment.username || "Anonymous"}
                    <span style={{ fontSize: "0.9em", color: "gray", marginLeft: "10px" }}>
          {moment(comment.createdAt).fromNow()} {/* Hiển thị thời gian */}
        </span>
                </p>
                <Rate disabled defaultValue={comment.rate || 0} />
                <p>{comment.content}</p>
                <button
                    type="link"
                    className="btnReply"
                    onClick={() => {
                        setReplyCommentId(comment.id);
                        setIsReplyModalVisible(true);
                    }}
                >
                    Reply
                </button>
                {comment.replies && comment.replies.length > 0 && (
                    <div className="replies">{renderReplies(comment.replies)}</div>
                )}
            </div>
        ));
    };

    const renderReplies = (replies) => {
        return replies.map((reply) => (
            <div key={reply.id} className="reply-item" style={{ marginLeft: "20px" }}>
                <p className="fw-bold">
                    {reply.username || "Anonymous"}
                    <span style={{ fontSize: "0.8em", color: "gray", marginLeft: "10px" }}>
          {moment(reply.createdAt).fromNow()} {/* Hiển thị thời gian */}
        </span>
                </p>
                <p>{reply.content}</p>
            </div>
        ));
    };


    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="movie-detail-container">
                <div className="movie-detail-content">
                    <div className="movie-detail-image">
                        <img src={movie.image} alt={movie.title} />
                    </div>
                    <div className="movie-detail-info">
                        <h1>{movie.title}</h1>
                        <Rate disabled value={movie.averageRating} />
                        <p>{movie.description}</p>
                        <p>
                            <strong>Đạo diễn:</strong> {movie.director}
                        </p>
                        <p>
                            <strong>Diễn viên:</strong> {movie.actors}
                        </p>
                        <p>
                            <strong>Thể loại:</strong> {movie.genre}
                        </p>
                        <p>
                            <strong>Thời lượng:</strong> {movie.duration}
                        </p>
                        <p>
                            <strong>Ngày khởi chiếu:</strong> {movie.releaseDate}
                        </p>
                    </div>
                </div>
                <div className="showtimes-section">
                    <h2>Showtimes</h2>
                    <div className="date-selector">
                        {[...new Set(showtimes.map((showtime) => moment(showtime.startTime).format("YYYY-MM-DD")))].map((date) => (
                            <button
                                key={date}
                                onClick={() => handleDateChange(date)}
                                style={{ background: date === selectedDate ? "red" : "transparent" }}
                            >
                                {moment(date).format("DD-MM dddd")}
                            </button>
                        ))}
                    </div>
                    <div className="time-selector">
                        {filteredShowtimes.length > 0 ? (
                            filteredShowtimes.map((showtime) => (
                                <button key={showtime.id} className="showtime-button">
                                    {moment(showtime.startTime).format("HH:mm")}
                                </button>
                            ))
                        ) : (
                            <p>No showtimes available for this date.</p>
                        )}
                    </div>
                </div>
                <div className="comments-section">
                    <h2>Comments</h2>
                    {renderComments(comments)}
                    <div className="add-comment">
                        <h3>Add a Comment</h3>
                        <TextArea
                            rows={3}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add your comment here"
                        />
                        <Rate onChange={(value) => setNewRating(value)} value={newRating} />
                        <Button
                            type="primary"
                            onClick={addComment}
                            style={{ marginTop: "10px" }}
                        >
                            Submit Comment
                        </Button>
                    </div>
                </div>
                <Modal
                    title="Reply to Comment"
                    visible={isReplyModalVisible}
                    onOk={submitReply}
                    onCancel={() => setIsReplyModalVisible(false)}
                >
                    <TextArea
                        rows={3}
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Add your reply here"
                    />
                </Modal>
            </div>
        </div>
    );
};

export default MovieDetail;
