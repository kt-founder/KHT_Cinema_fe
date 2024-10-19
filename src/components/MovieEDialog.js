import React, { useState } from 'react';
import styles from './StylesComponent/MovieEDialog.module.css';
import Api from "../Confligs/Api";
import {notification} from "antd";

const MovieEDialog = (props) => {
    const [movieData, setMovieData] = useState({
        id: props.movie.id,
        title: props.movie.title,
        genre: props.movie.genre,
        releaseDate: props.movie.releaseDate,
        director: props.movie.director,
        description: props.movie.description,
        duration:props.movie.duration,
        actor:props.movie.actor
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovieData({
            ...movieData,
            [name]: value
        });
    };

    const handleSubmit = () => {
        // Handle submit action (e.g., send data to API)
        console.log('Submitted movie data:', movieData);
        Api.UpdateMovie(movieData.id,movieData).then((res) => {
            if (res.data.message === 'Successful'){
                notification["success"]({
                    message: "Update movie successful",
                });
                window.location.reload()
            }
        }).catch((err)=>{
            console.log(err)
            notification["error"]({
                message: "Update movie not successful",
            });
        })
    };
    const [open, setOpen] = useState(false);
    const openDialog = () => {
        setOpen(true);
    };

    const closeDialog = () => {
        setOpen(false);
    };
    return (
        <div>
            <button className="edit-button" style={{background: '#3498db'}}>
                <i className="fa-solid fa-pen-to-square" onClick={openDialog}></i>
            </button>
            {open && (
            <div className={styles.dialog_container}>
                <div className={styles.dialog}>
                    <div className={styles.dialog_content}>
                        <div>
                            <img
                                src="https://via.placeholder.com/200x300"
                                alt="Movie Poster"
                                className={styles.movie_poster}
                            />
                        </div>
                        <div className={styles.movie_details}>
                            <p style={{color: 'aqua'}}>ID Movie: {movieData.id}</p>

                            <label>Name movie:</label>
                            <input
                                type="text"
                                name="title"
                                value={movieData.title}
                                onChange={handleChange}
                                placeholder="Movie name"
                            />

                            <label>Thể loại:</label>
                            <input
                                type="text"
                                name="genre"
                                value={movieData.genre}
                                onChange={handleChange}
                                placeholder="Thể loại"
                            />
                            <label>Nội dung:</label>
                            <textarea
                                name="description"
                                value={movieData.description}
                                onChange={handleChange}
                                placeholder="Nội dung"
                            />

                            <label>Năm ra mắt:</label>
                            <input
                                type="date"
                                name="releaseDate"
                                value={movieData.releaseDate}
                                onChange={handleChange}
                            />

                            <label>Đạo diễn:</label>
                            <input
                                type="text"
                                name="director"
                                value={movieData.director}
                                onChange={handleChange}
                                placeholder="Đạo diễn"
                            />

                            <label>Duration:</label>
                            <input
                                type="text"
                                name="duration"
                                value={movieData.duration}
                                onChange={handleChange}
                                placeholder="Movie duration"
                            />
                            <label>Actor:</label>

                            <input
                                type="text"
                                name="actor"
                                value={movieData.actor}
                                onChange={handleChange}
                                placeholder="Movie actor"
                            />
                        </div>
                    </div>
                    <div className={styles.movie_actions}>
                        <a href="#" onClick={handleSubmit}>Chỉnh sửa</a>
                        <a href="#" onClick={closeDialog}>Thoát</a>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
};

export default MovieEDialog;
