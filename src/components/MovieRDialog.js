import React, { useState } from 'react';
import styles from './StylesComponent/MovieDialog.module.css'; // Import CSS Module

const MovieDialog = (props) => {
    const [open, setOpen] = useState(false);

    const openDialog = () => {
        setOpen(true);
    };

    const closeDialog = () => {
        setOpen(false);
    };

    return (
        <div>
            {/* Nút mở dialog */}
            <button className="edit-button" style={{background: '#087373'}}>
                <i className="fa-brands fa-readme" onClick={openDialog}></i>
            </button>
            {/* Dialog hiển thị thông tin phim */}
            {open && (
                <div className={styles.dialog_container}>
                    <div className={styles.dialog}>
                        <div className={styles.dialog_content}>
                            <div>
                                <img
                                   src =  {props.movie.image != null ?  "https://via.placeholder.com/200x300" : null}
                                    alt="Movie Poster"
                                    className={styles.movie_poster}
                                />
                            </div>
                            <div className={styles.movie_details}>
                                <h2>
                                    {props.movie.title} <span className={styles.small_text}>2D</span>
                                </h2>
                                <p><strong>ID Movie:</strong> {props.movie.id}</p>
                                <p><strong>Thể loại:</strong> {props.movie.genre}</p>
                                <p><strong>Năm ra mắt:</strong> {props.movie.releaseDate}</p>
                                <p><strong>Thời lượng:</strong> {props.movie.actor}</p>
                                <p><strong>Đạo diễn:</strong> {props.movie.director}</p>
                                <p><strong>Diễn viên:</strong> {props.movie.actor}</p>
                                <p><strong>Khởi chiếu:</strong> 01/11/2024</p>
                                <p>
                                    <strong>Nội dung:</strong> {props.movie.description}...
                                </p>
                                <p className={styles.classification}>Trạng thái: {props.movie.active.toString()}</p>
                                <div className={styles.movie_actions}>
                                    <a href="#">Xem trailer</a>
                                    <a href="#" onClick={closeDialog}>Thoát</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieDialog;
