import React, { useState } from 'react';
import sty from './StylesComponent/MovieCDialog.module.css';
import styles from "./StylesComponent/MovieCDialog.module.css";
import Api from "../Confligs/Api";
import {notification} from "antd";
import axios from "axios";

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
    const [file, setFile] = useState(null);
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const [errorMessage, setErrorMessage] = useState("");
    const handleSubmit = async () => {
        setErrorMessage("")
        console.log('Submitted movie data:', movieData);
        if (file === null || movieData.title === '' || movieData.director === '' || movieData.genre === ''
        || movieData.releaseDate === '' || movieData.description === '' || movieData.duration === '' || movieData.actor === ''){
            setErrorMessage("Vui lòng điền đầy đủ thông tin")
            return;
        }
        const formData = new FormData();
        formData.append('movieRequest', new Blob([JSON.stringify(movieData)], { type: 'application/json' }));
        formData.append('file', file);
        try {
            const res = await axios.post('http://localhost:8080/movies/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (res.data.message === 'Successful'){
                    notification["success"]({
                        message: "Create movie successful",
                    });
                    window.location.reload()
                }
        } catch (error) {
            console.log(error)
            notification["error"]({
                message: "Create movie not successful",
            });
        }
        // Api.CreatMovie(movieData).then((res) => {
        //     if (res.data.message === 'Successful'){
        //         notification["success"]({
        //             message: "Create movie successful",
        //         });
        //         window.location.reload()
        //     }
        // }).catch((err)=>{
        //     console.log(err)
        //     notification["error"]({
        //         message: "Create movie not successful",
        //     });
        // })
    };

    const [open, setOpen] = useState(false);
    const openDialog = () => {
        setOpen(true);
    };

    const closeDialog = () => {
        setMovieData({
            title: '',
            genre: '',
            releaseDate: '',
            director: '',
            description: '',
            isActive: true,
            duration:'',
            actor:''
        })
        setErrorMessage("")
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
                            <div className={styles.movie_details}>
                                <label>Name movie:</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={movieData.title}
                                    onChange={handleChange}
                                    placeholder="Movie Name"
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

                                <label>Duration ( Minutes ) :</label>
                                <input
                                    type="number"
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
                            <div className={styles.movie_details}>
                                <label>Poster:</label>
                                <input type="file"  accept="image/*" onChange={handleFileChange} required/>

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
                                    style={{height:'170px'}}
                                    name="description"
                                    value={movieData.description}
                                    onChange={handleChange}
                                    placeholder="Nội dung"
                                />

                            </div>
                        </div>
                        {errorMessage && <p className={styles.error_message}>{errorMessage}</p>}
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
