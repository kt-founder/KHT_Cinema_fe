import React from 'react';

const MovieItem = ({ movie }) => {
    return (
        <div className="movie-item">
            <img src={movie.image} alt={movie.title} />
            <div className="movie-info">
                <h3>{movie.title}</h3>
            </div>
        </div>
    );
};

export default MovieItem;
