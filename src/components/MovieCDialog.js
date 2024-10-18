import React, { useState } from 'react';
import sty from './StylesComponent/MovieCDialog.module.css';

const MovieModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Hàm để mở modal
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    // Hàm để đóng modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            {/* Nút để mở modal */}
            <button className={sty.open_modal_button} onClick={handleOpenModal}>
                <i className="fa-solid fa-plus"></i>Thêm
            </button>

            {/* Modal hiển thị khi isModalOpen là true */}
            {isModalOpen && (
                <div className={sty.modal_overlay}>
                    <div className={sty.modal_content}>
                        <div className={sty.modal_header}>
                            <h2>Thông tin phim</h2>
                        </div>
                        <div className={sty.modal_body}>
                            <label>Cinema ID</label>
                            <input type="text" value="def7f4c6-fd2aa37e-a1b2b5b6" readOnly />

                            <label>Movie ID</label>
                            <input type="text" value="15" readOnly />

                            <label>Start Time</label>
                            <input type="text" value="2023-06-09T16:00" readOnly />
                        </div>
                        <div className={sty.modal_footer}>
                            <button className={sty.modal_ok_button} onClick={handleCloseModal}>
                                OK
                            </button>
                            <button className={sty.modal_ok_button} onClick={handleCloseModal}>
                                X
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieModal;
