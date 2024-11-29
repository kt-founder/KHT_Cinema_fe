import React, { useState } from 'react';
import styles from './StylesComponent/MovieEDialog.module.css';
import {notification} from "antd";

const SnackEDialog = (props) => {
    const [snackData, setSnackData] = useState({
        id: props.snack.id,
        name: props.snack.name,
        price: props.snack.price,
        img: props.snack.img,
        active: props.snack.active,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSnackData({
            ...snackData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        if (!snackData.name || !snackData.price || !snackData.img) {
            notification['error']({
                message: 'Vui lòng điền đầy đủ thông tin',
            });
            return;
        }
        if (isNaN(snackData.price) || Number(snackData.price) <= 0) {
            notification['error']({
                message: 'Giá phải là một số hợp lệ lớn hơn 0',
            });
            return;
        }
        const requestData = {
            ...snackData,
            price: Number(snackData.price),
        };
        try {
            const response = await fetch(`http://localhost:8080/snacks/edit-snacks`,{
                method:'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });
            const result = await response.json();
            if (result.message === 'Successful'){
                notification["success"]({
                    message: "Change status snack successful",
                });
                window.location.reload()
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            notification["error"]({
                message: "Change status snack not successful",
            });
        }
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
                                    src={snackData.img}
                                    alt="Snack Poster"
                                    className={styles.movie_poster}
                                />
                            </div>
                            <div className={styles.movie_details}>
                                <p style={{color: 'aqua'}}>ID Snack: {snackData.id}</p>

                                <label>Tên sản phẩm :</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={snackData.name}
                                    onChange={handleChange}
                                    placeholder="Tên sản phẩm"
                                />

                                <label>Giá:</label>
                                <input
                                    type="text"
                                    name="price"
                                    value={snackData.price}
                                    onChange={handleChange}
                                    placeholder="Giá bán ( VNĐ )"
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

export default SnackEDialog;
