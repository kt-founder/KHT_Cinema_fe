import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "../../components/StylesComponent/Navbar.css";
import "../styles/MovieDetail.css";
import { Rate, Button, Input, notification } from "antd";
import API from "../../Confligs/Api";

const { TextArea } = Input;

const MovieDetail = () => {
  const { id: movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
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

    API.GetMovieById(movieId)
      .then((response) => setMovie(response.data.data))
      .catch((error) => console.error("Error fetching movie details:", error));

    fetchComments(); // Load comments ban đầu
  }, [movieId, navigate]);

  // Hàm để load lại bình luận
  const fetchComments = () => {
    API.GetCommentsByMovie(movieId)
      .then((response) => setComments(response.data.data || []))
      .catch((error) => console.error("Error fetching comments:", error));
  };

  const addComment = () => {
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
        fetchComments(); // Gọi lại hàm để load bình luận mới
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
        notification.error({
          message: "Failed to add comment",
        });
      });
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

        <div className="comments-section">
          <h2>Comments</h2>
          {comments.map((comment, index) => (
            <div key={index} className="comment-item">
              <p className="fw-bold">{comment?.username || "Anonymous"}</p>
              <Rate disabled defaultValue={comment?.rate || 0} />
              <p>{comment?.content}</p>
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
      </div>
    </div>
  );
};

export default MovieDetail;
