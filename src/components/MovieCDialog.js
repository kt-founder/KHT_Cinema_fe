import React, { useState } from 'react';
import sty from './StylesComponent/MovieCDialog.module.css';
import styles from "./StylesComponent/MovieEDialog.module.css";
import Api from "../Confligs/Api";
import {notification} from "antd";

const MovieCDialog = () => {
    const [movieData, setMovieData] = useState({
        title: '',
        genre: '',
        releaseDate: '',
        director: '',
        description: '',
        isActive: true,
        duration:'',
        actor:''
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
        Api.CreatMovie(movieData).then((res) => {
            if (res.data.message === 'Successful'){
                notification["success"]({
                    message: "Create movie successful",
                });
                window.location.reload()
            }
        }).catch((err)=>{
            console.log(err)
            notification["error"]({
                message: "Create movie not successful",
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
        <div style={{textAlign:'left'}}>
            <button className="edit-button" style={{background: '#2eb530',padding:'13px 18px 13px 18px'}} onClick={openDialog}>
                <i className="fa-solid fa-plus"  style={{marginRight:'10px'}}></i> Thêm
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

                                <label>Name movie:</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={movieData.title}
                                    onChange={handleChange}
                                    placeholder="Movie Name"
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
                            <a href="#" onClick={handleSubmit}>Thêm</a>
                            <a href="#" onClick={closeDialog}>Thoát</a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieCDialog;
