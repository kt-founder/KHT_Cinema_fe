import React, { useState } from 'react';
import styles from "./StylesComponent/MovieEDialog.module.css";
import {notification} from "antd";

const SnackCDialog = () => {
    const [snackData, setSnackData] = useState({
        name: '',
        price: '',
        img: '',
        active: true,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSnackData({
            ...snackData,
            [name]: value,
        });
    };

    const handleOptionChange = (e) => {
        const selectedOption = e.target.value;
        let imgUrl = '';
        if (selectedOption === 'Food') {
            imgUrl = 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Popcorn.jpg';
        } else if (selectedOption === 'Beverage') {
            imgUrl = 'https://thumbs.dreamstime.com/z/cans-beverages-19492376.jpg?ct=jpeg';
        }
        setSnackData({
            ...snackData,
            img: imgUrl,
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
            const response = await fetch(`http://localhost:8080/snacks/create-snacks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });
            const result = await response.json();
            if (result.message === 'Successful') {
                notification['success']({
                    message: 'Thêm snack thành công',
                });
                window.location.reload();
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            notification['error']({
                message: 'Thêm snack không thành công',
            });
        }
    };


    const [open, setOpen] = useState(false);
    const openDialog = () => {
        setOpen(true);
    };

    const closeDialog = () => {
        setSnackData({
            name: '',
            price: '',
            img: '',
            active: true,
        });
        setOpen(false);
    };

    return (
        <div style={{ textAlign: 'left' }}>
            <button
                className="edit-button"
                style={{ background: '#2eb530', padding: '13px 18px' }}
                onClick={openDialog}
            >
                 Thêm Snack
            </button>
            {open && (
                <div className={styles.dialog_container}>
                    <div className={styles.dialog}>
                        <div className={styles.dialog_content}>
                            <div className={styles.movie_details}>
                                <label>Loại: </label>
                                <select onChange={handleOptionChange}
                                        style={{padding: '8px', marginBottom: '15px', borderRadius: '8px'}}>
                                    <option value=""> Chọn loại sản phẩm</option>
                                    <option value="Food"> Food</option>
                                    <option value="Beverage"> Beverage</option>
                                </select>

                                <label>Tên sản phẩm :</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={snackData.name}
                                    onChange={handleChange}
                                    placeholder="Tên sản phẩm"
                                />

                                <label>Giá ( VNĐ ):</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={snackData.price}
                                    onChange={handleChange}
                                    placeholder="Giá bán ( VNĐ )"
                                />
                            </div>
                        </div>
                        <div className={styles.movie_actions}>
                            <a href="#" onClick={handleSubmit}>
                                Thêm
                            </a>
                            <a href="#" onClick={closeDialog}>
                                Thoát
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SnackCDialog;

