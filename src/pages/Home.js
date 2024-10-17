import React, { useEffect, useState } from 'react';
import { getMovies } from '../services/movieService';
import MovieList from '../components/MovieList';
import Header from "../components/Header";

function Home() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
      const fetchMovies = async () => {
        try {
          const data = await getMovies();
          setMovies(data.data);
        } catch (error) {
          console.error('Có lỗi xảy ra khi lấy danh sách phim:', error);
        }
      };
      fetchMovies();
    }, []);

    return (
        <div>
            <Header/>
            <h1>RẠP CHIẾU PHIM KHT SCREENX</h1>
            <p>Rạp chiếu phim phục vụ khán giả với những thước phim điện ảnh chất lượng, dịch vụ tốt nhất với giá vé hợp lý.</p>
            <img src="https://img.tripi.vn/cdn-cgi/image/width=1500,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/474113vDb/anh-canh-dep-nhat-the-gioi-full-hd_014850158.jpg" alt="Logo big size"/>
            <MovieList movies={movies}/>
        </div>
    );
}

export default Home;