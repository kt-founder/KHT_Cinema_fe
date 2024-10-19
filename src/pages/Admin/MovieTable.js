import React, {useEffect, useState} from 'react';
import './MovieTable.css';
import MovieCDialog from "../../components/MovieCDialog"; // File CSS được cập nhật bên dưới
import Api from '../../Confligs/Api'
import {notification, Spin} from "antd";
import MovieRDialog from "../../components/MovieRDialog";
import MovieEDialog from "../../components/MovieEDialog";
const MovieTable = () => {
    const [movies, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true)
        // Sử dụng axiosInstance để gửi request
        Api.GetAllMovie()
            .then((response) => {
                setData(response.data.data);
                setLoading(false)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    const disable = (id) => {
        Api.DisableMovie(id).then((res) => {
            if (res.data.message === 'Successful'){
                notification["success"]({
                    message: "Change status movie successful",
                });
                window.location.reload()
            }
        }).catch((err)=>{
            console.log(err)
            notification["error"]({
                message: "Change status movie not successful",
            });
        })
    }
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
                    <th style={{textAlign: 'center'}}>Action</th>
                </tr>
                </thead>
                <tbody>
                {movies != null && movies.map((movie) => (
                    <tr key={movie.id}>
                        <td>{movie.id}</td>
                        <td>{movie.title}</td>
                        <td>{movie.releaseDate}</td>
                        <td>{movie.director}</td>
                        <td>{movie.active.toString()}</td>
                        <td className="action-buttons">
                            <MovieRDialog movie = {movie}/>
                            <MovieEDialog movie = {movie}/>
                            <button className="delete-button">
                                {movie.active ?
                                    <i className="fa-solid fa-lock" onClick={() => disable(movie.id)}></i>
                                    :
                                    <i className="fa-solid fa-unlock" onClick={() => disable(movie.id)}></i>}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div style={{marginTop: '20px'}}>
                {loading ? (
                    <Spin tip="Loading..." size="large"/>
                ) :
                    null
                }
            </div>
        </div>
    );
};

export default MovieTable;
