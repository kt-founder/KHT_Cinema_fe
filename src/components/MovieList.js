import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Carousel } from 'antd';
import { useNavigate } from 'react-router-dom'; // Điều hướng
import './StylesComponent/MovieList.css'; // CSS cho danh sách phim
import { Rate } from "antd";
const { Meta } = Card;

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [hotMovies, setHotMovies] = useState([]); // State cho danh sách phim hot
    const navigate = useNavigate(); // Điều hướng

    useEffect(() => {
        // Gọi API để lấy danh sách phim
        fetch('http://localhost:8080/movies/get-all')
            .then((response) => response.json())
            .then((data) => {
                const sortedMovies = [...data.data].sort((a, b) => b.averageRating - a.averageRating); // Sắp xếp theo đánh giá
                setMovies(data.data); // Toàn bộ phim
                setHotMovies(sortedMovies.slice(0, 5)); // Chọn 5 phim có đánh giá cao nhất
            })
            .catch((error) => console.error('Error fetching movies:', error));
    }, []);

    const handleTitleClick = (id) => {
        navigate(`/movies/${id}`); // Điều hướng tới trang chi tiết phim
    };

    return (
        <div className="movie-list-container">
            <h2>Phim Hot</h2>
            <Carousel dots={false} arrows slidesToShow={4} slidesToScroll={1} className="custom-carousel">
                {hotMovies.map((movie) => (
                    <div key={movie.id} className="carousel-item">
                        <Card
                            hoverable
                            cover={<img alt={movie.title} src={movie.image} />}
                            className="movie-card"
                        >
                            <Meta
                                title={<a onClick={() => handleTitleClick(movie.id)}>{movie.title}</a>}
                                description={(
                                    <div>
                                        <p><strong>Thể loại:</strong> {movie.genre}</p>
                                        <p><strong>Đánh giá:</strong> <Rate disabled value={movie.averageRating} /></p>
                                        <p><strong>Thời lượng:</strong> {movie.duration}</p>
                                    </div>
                                )}
                            />
                        </Card>
                    </div>
                ))}
            </Carousel>

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
                                title={<a onClick={() => handleTitleClick(movie.id)}>{movie.title}</a>}
                                description={(
                                    <div>
                                        <p><strong>Thể loại:</strong> {movie.genre}</p>
                                        <p><strong>Đánh giá:</strong> <Rate disabled value={movie.averageRating} /></p>
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
