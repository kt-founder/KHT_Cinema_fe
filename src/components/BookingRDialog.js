import React, { useState } from 'react';
import styles from './StylesComponent/MovieDialog.module.css';

const BookingRDialog = (props) => {
    const [open, setOpen] = useState(false);
    const [startTime, endTime, hall] = props.booking.infoShowTime;
    const info = {
        movie: props.booking.movie,
        date: startTime.split("T")[0],
        startTime: startTime.split("T")[1],
        endTime: endTime.split("T")[1],
        hall: hall,
        seats: props.booking.seatIds.join(", "),
        fvb:props.booking.fvb || {}
    }
    const openDialog = () => {
        setOpen(true);
    };

    const closeDialog = () => {
        setOpen(false);
    };

    return (
        <div>
            <button className="edit-button" style={{background: '#087373'}}>
                <i className="fa-brands fa-readme" onClick={openDialog}></i>
            </button>
            {open && (
                <div className={styles.dialog_container}>
                    <div className={styles.dialog}>
                        <div className={styles.dialog_content}>
                            <div className={styles.movie_details} style={{textAlign: 'center'}}>
                                <p style={{marginBottom: '25px', fontSize: '25px'}}><strong>Phim:</strong> {info.movie}
                                </p>
                                <p style={{marginBottom: '25px', fontSize: '25px'}}><strong>Ngày
                                    chiếu:</strong> {info.date}</p>
                                <p style={{marginBottom: '25px', fontSize: '25px'}}><strong>Giờ bắt đầu - Giờ kết
                                    thúc:</strong> {info.startTime} - {info.endTime}</p>
                                <p style={{marginBottom: '25px', fontSize: '25px'}}><strong>Phòng:</strong> {info.hall}
                                </p>
                                <p style={{marginBottom: '25px', fontSize: '25px'}}><strong>Ghế đã
                                    đặt:</strong> {info.seats}</p>

                                {info.fvb.length > 0 && <p style={{marginBottom: '25px', fontSize: '25px'}}><strong>Thêm:</strong> {info.fvb.map((f) => (
                                    <div key={f.name} style={{marginBottom: '2px'}}>
                                        {f.quantity} {f.name}
                                    </div>
                                ))}</p>}
                                <div className={styles.movie_actions}>
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

export default BookingRDialog;
