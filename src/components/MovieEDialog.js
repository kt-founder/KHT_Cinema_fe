import React, { useState } from 'react';
import styles from './StylesComponent/MovieEDialog.module.css';

const MovieEDialog = () => {
    const [movieData, setMovieData] = useState({
        id: '',
        title: '',
        genre: '',
        releaseDate: '',
        duration: '',
        director: '',
        actors: '',
        premiereDate: '',
        description: '',
        status: ''
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
                            <label>ID Movie:</label>
                            <input
                                type="text"
                                name="id"
                                value={movieData.id}
                                onChange={handleChange}
                                placeholder="Movie ID"
                            />

                            <label>Thể loại:</label>
                            <input
                                type="text"
                                name="genre"
                                value={movieData.genre}
                                onChange={handleChange}
                                placeholder="Thể loại"
                            />

                            <label>Năm ra mắt:</label>
                            <input
                                type="date"
                                name="releaseDate"
                                value={movieData.releaseDate}
                                onChange={handleChange}
                            />
                            <label>Thời lượng:</label>
                            <input
                                type="text"
                                name="duration"
                                value={movieData.duration}
                                onChange={handleChange}
                                placeholder="Thời lượng"
                            />

                            <label>Đạo diễn:</label>
                            <input
                                type="text"
                                name="director"
                                value={movieData.director}
                                onChange={handleChange}
                                placeholder="Đạo diễn"
                            />
                        </div>
                        <div className={styles.movie_details}>

                            <label>Diễn viên:</label>
                            <input
                                type="text"
                                name="actors"
                                value={movieData.actors}
                                onChange={handleChange}
                                placeholder="Diễn viên"
                            />

                            <label>Khởi chiếu:</label>
                            <input
                                type="date"
                                name="premiereDate"
                                value={movieData.premiereDate}
                                onChange={handleChange}
                            />

                            <label>Nội dung:</label>
                            <textarea
                                name="description"
                                value={movieData.description}
                                onChange={handleChange}
                                placeholder="Nội dung"
                            />

                            <label>Trạng thái:</label>
                            <input
                                type="text"
                                name="status"
                                value={movieData.status}
                                onChange={handleChange}
                                placeholder="Trạng thái"
                            />

                        </div>
                    </div>
                    <div className={styles.movie_actions}>
                        <a href="#">Chỉnh sửa</a>
                        <a href="#" onClick={closeDialog}>Thoát</a>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
};

export default MovieEDialog;
