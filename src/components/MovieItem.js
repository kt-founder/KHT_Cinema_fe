import React from 'react';

function MovieItem({ movie }) {
  return (
    <div className="movie-item">
      <img src={movie.image} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
    </div>
  );
}

export default MovieItem;
