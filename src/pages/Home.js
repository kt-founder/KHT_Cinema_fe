import React, { useEffect, useState } from 'react';
import { getMovies } from '../services/movieService';
import MovieList from '../components/MovieList';
import Header from "../components/Header";

function Home() {
  const [movies, setMovies] = useState([]);

  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     try {
  //       const data = await getMovies();
  //       setMovies(data);
  //     } catch (error) {
  //       console.error('Có lỗi xảy ra khi lấy danh sách phim:', error);
  //     }
  //   };
  //   fetchMovies();
  // }, []);

  return (
    <div >
        <Header/>
        <h1>RẠP CHIẾU PHIM KHT SCREENX</h1>
        <p>Rạp chiếu phim phục vụ khán giả với những thước phim điện ảnh chất lượng, dịch vụ tốt nhất với giá vé hợp lý.</p>
        <MovieList movies={movies} />
        <img src="data:image/jpeg;base64,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" alt="KHT logo" />
    </div>
  );
}

export default Home;
