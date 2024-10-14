import React from 'react';
import MovieItem from './MovieItem'; // Đảm bảo import đúng thứ tự
const MovieList = ({ movies }) => {
    return (
        <div className="movie-list">
            {movies.map((movie) => (
                <MovieItem key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export default MovieList;
