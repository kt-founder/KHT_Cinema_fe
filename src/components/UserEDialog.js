import React, {useEffect, useState} from 'react';
import styles from './StylesComponent/MovieEDialog.module.css';
import Api from "../Confligs/Api";
import {notification} from "antd";

const UserEDialog = (props) => {
    const [userData, setData] = useState({
        id: props.user.id,
        name: props.user.name,
        username: props.user.username,
        phone: props.user.phone,
        email: props.user.email
    });

    useEffect(() => {
        setData(props.user);
    }, [props.user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...userData,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        // Handle submit action (e.g., send data to API)
        console.log('Submitted movie data:', userData);
        Api.EditProfile(userData).then((response) => {
            if (response.data.message === 'Successful'){
                notification["success"]({
                    message: "Edit profile successful",
                });
                window.location.href = '/myInfor'
            }
        }).catch((err) => {
            console.log(err)
            notification["error"]({
                message: "Edit profile not successful",
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
            <li onClick={openDialog}>Edit profile</li>
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
                                <label>Username:</label>
                                <input
                                    style={{color: '#13b3b3', marginBottom: '30px'}}
                                    disabled={true}
                                    type="text"
                                    name="username"
                                    value={userData.username}
                                    onChange={handleChange}
                                    placeholder="Username"
                                />

                                <label>Email:</label>
                                <input
                                    style={{color: '#13b3b3', marginBottom: '30px'}}
                                    disabled={true}
                                    type="text"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleChange}
                                    placeholder="Thể loại"
                                />
                                <label>Name:</label>
                                <input
                                    style={{color: '#13b3b3', marginBottom: '30px'}}
                                    name="name"
                                    value={userData.name}
                                    onChange={handleChange}
                                    placeholder="Name"
                                />

                                <label>Phone:</label>
                                <input
                                    style={{color: '#13b3b3', marginBottom: '30px'}}
                                    type="text"
                                    name="phone"
                                    value={userData.phone}
                                    onChange={handleChange}
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

export default UserEDialog;
