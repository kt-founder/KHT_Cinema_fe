import React, { useState } from 'react';
import styles from './StylesComponent/MovieEDialog.module.css';
import Api from "../Confligs/Api";
import {notification} from "antd";
import axios from "axios";

const MovieEDialog = (props) => {
    const [movieData, setMovieData] = useState({
        id: props.movie.id,
        title: props.movie.title,
        genre: props.movie.genre,
        releaseDate: props.movie.releaseDate,
        director: props.movie.director,
        description: props.movie.description,
        duration:props.movie.duration,
        actor:props.movie.actor,
        image:props.movie.image
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovieData({
            ...movieData,
            [name]: value
        });
    };
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
        }
    };
    const [errorMessage, setErrorMessage] = useState("");
    const handleSubmit = async () => {
        console.log('Submitted movie data:', movieData);
        setErrorMessage("");
        const formData = new FormData();
        formData.append("movieRequest", new Blob([JSON.stringify(movieData)], { type: "application/json" }));
        if (movieData.title === '' || movieData.director === '' || movieData.genre === ''
            || movieData.releaseDate === '' || movieData.description === '' || movieData.duration === '' || movieData.actor === ''){
            setErrorMessage("Vui lòng điền đầy đủ thông tin")
            return;
        }
        if (file) {
            formData.append("file", file);
        }
        console.log(formData)
        try {
            const res = await axios.put(`http://localhost:8080/movies/update/${movieData.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (res.data.message === 'Successful'){
                    notification["success"]({
                        message: "Update movie successful",
                    });
                    window.location.reload()
                }
        } catch (error) {
            console.log(error)
            notification["error"]({
                message: "Update movie not successful",
            });
        }
        // Api.UpdateMovie(movieData.id,movieData).then((res) => {
        //     if (res.data.message === 'Successful'){
        //         notification["success"]({
        //             message: "Update movie successful",
        //         });
        //         window.location.reload()
        //     }
        // }).catch((err)=>{
        //     console.log(err)
        //     notification["error"]({
        //         message: "Update movie not successful",
        //     });
        // })
    };


    const [open, setOpen] = useState(false);
    const openDialog = () => {
        setOpen(true);
    };

    const closeDialog = () => {
        setMovieData({
            id: props.movie.id,
            title: props.movie.title,
            genre: props.movie.genre,
            releaseDate: props.movie.releaseDate,
            director: props.movie.director,
            description: props.movie.description,
            duration: props.movie.duration,
            actor: props.movie.actor,
            image: props.movie.image
        });
        setFileName("");
        setErrorMessage("")
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
                    <p style={{color: 'aqua'}}>ID Movie: {movieData.id}</p>
                    <div className={styles.dialog_content}>
                        <div className={styles.movie_details}>
                            <label>Name movie:</label>
                            <input
                                type="text"
                                name="title"
                                value={movieData.title}
                                onChange={handleChange}
                                placeholder="Movie name"
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
                                value={parseInt(movieData.duration.split(" ")[0])}
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
                            <div style={{display: "flex", alignItems: "center"}}>
                                <label style={{marginRight: "20px"}}>Poster:</label>
                                {fileName ? (
                                    <span style={{marginRight: "10px", padding:'5px 0 0 0'}}>🖼️ {fileName}</span>
                                ) : (
                                    <img
                                        style={{marginRight: "20px"}}
                                        src={movieData.image}
                                        alt="Movie Poster"
                                        className={styles.movie_poster}
                                    />
                                )}
                                <label
                                    htmlFor="fileInput"
                                    style={{
                                        border: "1px black",
                                        padding: "8px",
                                        backgroundColor: "orange",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                    }}
                                >
                                    <span id="fileLabel">Sửa</span>
                                </label>
                                <input
                                    type="file"
                                    id="fileInput"
                                    accept="image/*"
                                    style={{display: "none"}}
                                    onChange={handleFileChange}
                                    required
                                />
                            </div>

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
                                style={{height:'200px'}}
                                name="description"
                                value={movieData.description}
                                onChange={handleChange}
                                placeholder="Nội dung"
                            />


                        </div>
                    </div>
                    {errorMessage && <p className={styles.error_message}>{errorMessage}</p>}
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
