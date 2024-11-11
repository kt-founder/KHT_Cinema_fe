import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'antd';
import { useNavigate } from 'react-router-dom'; // Điều hướng
import './StylesComponent/MovieList.css'; // CSS cho danh sách phim
import { Rate} from "antd";
const { Meta } = Card;

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate(); // Điều hướng

    useEffect(() => {
        // Gọi API để lấy danh sách phim
        fetch('http://localhost:8080/movies/get-all')
            .then((response) => response.json())
            .then((data) => setMovies(data.data))
            .catch((error) => console.error('Error fetching movies:', error));
    }, []);

    const handleTitleClick = (id) => {
        navigate(`/movies/${id}`); // Điều hướng tới trang chi tiết phim
    };

    return (
        <div className="movie-list-container">
            <h2>Phim Đang Chiếu</h2>
            <Row gutter={[24, 24]}>
                {movies.map((movie) => (
                    <Col span={6} key={movie.id}>
                        <Card
                            hoverable
                            cover={<img alt={movie.title} src={movie.image} />}
                            className="movie-card"
                        >
                            <Meta
                                title={<a onClick={() => handleTitleClick(movie.id)}>{movie.title}</a>} // Thêm sự kiện click vào title
                                description={(
                                    <div>
                                        <p><strong>Thể loại:</strong> {movie.genre}</p>
                                        <p><strong>Đánh giá:</strong><Rate value={movie.averageRating}/> </p>
                                        <p><strong>Thời lượng:</strong> {movie.duration}</p>
                                    </div>
                                )}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default MovieList;
