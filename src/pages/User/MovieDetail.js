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
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [replyCommentId, setReplyCommentId] = useState(null); // ID của bình luận đang reply
  const [replyContent, setReplyContent] = useState(""); // Nội dung của phản hồi
  const [isReplyModalVisible, setIsReplyModalVisible] = useState(false); // Trạng thái modal

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

  const addComment = () => {
    const token = sessionStorage.getItem("HKT_ACCESS_TOKEN_USER");
    if (token) {
      API.GetMyInFor()
          .then((response) => {
            const fetchedUserId = response.data.data.id;
            setUserId(fetchedUserId);
            const fetchedUsername = response.data.data.username;
            setUsername(fetchedUsername);
          })
          .catch((error) => {
            console.error("Error fetching user info:", error);
            notification.error({
              message: "Failed to fetch user info",
            });
          });
    } else {
      navigate("/login");
    }
    if (!userId) {
      notification.error({
        message: "You need to login to add a comment",
      });
      navigate("/login");
      return;
    }

    if (!newComment || newRating === 0) {
      notification.warning({
        message: "Please add a comment and rating",
      });
      return;
    }

    const commentRequest = {
      movieId: movieId.toString(),
      content: newComment,
      username: username,
      parentCommentId: null,
      rate: newRating,
    };

    API.AddComment(userId, commentRequest)
        .then((response) => {
          notification.success({
            message: "Comment added successfully",
          });
          setNewComment("");
          setNewRating(0);
          fetchComments();
        })
        .catch((error) => {
          console.error("Error adding comment:", error);
          notification.error({
            message: "Failed to add comment",
          });
        });
  };

  const handleReply = (parentCommentId) => {

    setReplyCommentId(parentCommentId);
    setIsReplyModalVisible(true); // Hiển thị modal để nhập nội dung phản hồi
  };

  const submitReply = () => {
    if (!replyContent) {
      notification.warning({
        message: "Please add reply content",
      });
      return;
    }

    // Lấy thông tin người dùng nếu chưa có
    const token = sessionStorage.getItem("HKT_ACCESS_TOKEN_USER");
    if (token && !userId) {
      API.GetMyInFor()
          .then((response) => {
            const fetchedUserId = response.data.data.id;
            setUserId(fetchedUserId);
            const fetchedUsername = response.data.data.username;
            setUsername(fetchedUsername);

            // Sau khi có thông tin userId, thực hiện gửi phản hồi
            sendReply(fetchedUserId);
          })
          .catch((error) => {
            console.error("Error fetching user info:", error);
            notification.error({
              message: "Failed to fetch user info",
            });
          });
    } else if (userId) {
      // Nếu đã có userId thì trực tiếp gửi phản hồi
      sendReply(userId);
    } else {
      navigate("/login");
    }
  };

// Hàm gửi phản hồi
  const sendReply = (userId) => {
    const replyRequest = {
      movieId: movieId.toString(),
      content: replyContent,
      parentCommentId: replyCommentId,
      rate: 0, // Không cần đánh giá cho reply
    };

    API.ReplyToComment(userId, replyCommentId, replyRequest)
        .then((response) => {
          notification.success({
            message: "Reply added successfully",
          });
          setReplyContent("");
          setIsReplyModalVisible(false);
          fetchComments(); // Load lại danh sách bình luận sau khi thêm phản hồi
        })
        .catch((error) => {
          console.error("Error adding reply:", error);
          notification.error({
            message: "Failed to add reply",
          });
        });
  };


  const filteredShowtimes = showtimes.filter((showtime) =>
      moment(showtime.startTime).isSame(selectedDate, "day")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const renderReplies = (replies) => {
    return replies.map((reply) => (
        <div key={reply.id} className="reply-item" style={{ marginLeft: "20px" }}>
          <p className="fw-bold">{reply.username || "Anonymous"}</p>
          <p>{reply.content}</p>
        </div>
    ));
  };

  const renderComments = (comments) => {
    return comments.map((comment) => (
        <div key={comment.id} className="comment-item">
          <p className="fw-bold">{comment.username || "Anonymous"}</p>
          <Rate disabled defaultValue={comment.rate || 0} />
          <p>{comment.content}</p>

          {/* Nút Reply chỉ hiển thị cho comment chính */}
          <button type="link" class ="btnReply" onClick={() => handleReply(comment.id)}>
            Reply
          </button>

          {/* Hiển thị các replies nếu có */}
          {comment.replies && comment.replies.length > 0 && (
              <div className="replies">
                {renderReplies(comment.replies)}
              </div>
          )}
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
              <p><strong>Đạo diễn:</strong> {movie.director}</p>
              <p><strong>Diễn viên:</strong> {movie.actors}</p>
              <p><strong>Thể loại:</strong> {movie.genre}</p>
              <p><strong>Thời lượng:</strong> {movie.duration}</p>
              <p><strong>Ngày khởi chiếu:</strong> {movie.releaseDate}</p>
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
