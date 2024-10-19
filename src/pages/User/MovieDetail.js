import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';  // Import Navbar
import '../../components/StylesComponent/Navbar.css'; // Import CSS
import '../styles/MovieDetail.css'; // Import CSS chi tiết phim

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/movies/get/${id}`)
            .then((response) => response.json())
            .then((data) => setMovie(data.data))
            .catch((error) => console.error('Error fetching movie details:', error));
    }, [id]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar /> {/* Hiển thị thanh điều hướng */}
            <div className="movie-detail-container">
                <div className="movie-detail-content">
                    <div className="movie-detail-image">
                        <img src={movie.image} alt={movie.title} />
                    </div>
                    <div className="movie-detail-info">
                        <h1>{movie.title}</h1>
                        <p>{movie.description}</p>
                        <p><strong>Đạo diễn:</strong> {movie.director}</p>
                        <p><strong>Diễn viên:</strong> {movie.actors}</p>
                        <p><strong>Thể loại:</strong> {movie.genre}</p>
                        <p><strong>Thời lượng:</strong> {movie.duration}</p>
                        <p><strong>Ngày khởi chiếu:</strong> {movie.releaseDate}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;