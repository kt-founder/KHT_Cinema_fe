import React from 'react';
import './MovieTable.css';
import MovieCDialog from "../../components/MovieCDialog"; // File CSS được cập nhật bên dưới

const MovieTable = () => {
    // Dữ liệu mẫu cho bảng phim
    const movies = [
        { id: 1, name: 'Inception', releaseDate: '2010-07-16', director: 'Christopher Nolan' },
        { id: 2, name: 'Interstellar', releaseDate: '2014-11-07', director: 'Christopher Nolan' },
        { id: 3, name: 'The Dark Knight', releaseDate: '2008-07-18', director: 'Christopher Nolan' },
    ];

    return (
        <div className="movie-container">
            <div className="movie-header">
                {/*<h1>Movie</h1>*/}
                <div className="search-box">
                    <input type="text" placeholder="Search..."/>
                    <i className="fas fa-search"></i>
                </div>
                <div style={{textAlign: 'right'}}>
                    <MovieCDialog/>
                </div>
            </div>
            <table className="movie-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Release Date</th>
                    <th>Director</th>
                    <th>isActive</th>
                    <th style={{textAlign:'center'}}>Action</th>
                </tr>
                </thead>
                <tbody>
                {movies.map((movie) => (
                    <tr key={movie.id}>
                        <td>{movie.id}</td>
                        <td>{movie.name}</td>
                        <td>{movie.releaseDate}</td>
                        <td>{movie.director}</td>
                        <td>{movie.director}</td>
                        <td className="action-buttons">
                            <button className="edit-button" style={{background: '#087373'}}><i
                                className="fa-brands fa-readme"></i>
                            </button>
                            <button className="edit-button" style={{background: '#3498db'}}>
                                <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button className="delete-button">
                                <i className="fa-solid fa-lock"></i>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default MovieTable;
