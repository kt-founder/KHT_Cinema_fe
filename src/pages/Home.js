import React, { useEffect, useState } from 'react';
import { getMovies, getTrendingCinemas } from '../services/movieService'; // Gọi thêm dịch vụ lấy rạp thịnh hành
import MovieList from '../components/MovieList';
import CinemaList from '../components/CinemaList'; // Thêm component để hiển thị rạp thịnh hành
import Header from "../components/Header";

function Home() {
    const [movies, setMovies] = useState([]);
    const [cinemas, setCinemas] = useState([]);

    useEffect(() => {
        const fetchMoviesAndCinemas = async () => {
            try {
                const movieData = await getMovies();
                setMovies(movieData);

                const cinemaData = await getTrendingCinemas(); // Giả sử có API này để lấy rạp thịnh hành
                setCinemas(cinemaData);
            } catch (error) {
                console.error('Có lỗi xảy ra khi lấy dữ liệu:', error);
            }
        };
        fetchMoviesAndCinemas();
    }, []);

    return (
        <div >
            <Header />
            <h1>RẠP CHIẾU PHIM KHT SCREENX</h1>
            <p>Rạp chiếu phim phục vụ khán giả với những thước phim điện ảnh chất lượng, dịch vụ tốt nhất với giá vé hợp lý.</p>

            <h2>Phim đang chiếu</h2>
            <MovieList movies={movies} />

            <h2>Rạp chiếu phim thịnh hành</h2>
            <CinemaList cinemas={cinemas} /> {/* Hiển thị danh sách rạp thịnh hành */}
        </div>
    );
}

export default Home;
