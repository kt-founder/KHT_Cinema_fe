import React from 'react';
import styles from '../styles/UserProfile.module.css'; // Import CSS Module

const UserProfile = () => {
    const userData = {
        avatar: 'https://via.placeholder.com/150',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+123 456 7890',
        address: '123 Main Street, City, Country',
    };

    return (
        <div className={styles.profile_container}>
            <div>
                <button>Quay lại</button>
            </div>
            <div className={styles.profile_header}>
                <img src={userData.avatar} alt="Avatar" className={styles.profile_avatar}/>
                <h2>{userData.name}</h2>
                <p>{userData.email}</p>
            </div>

            <div className={styles.profile_details}>
                <div className={styles.profile_info}>
                    <h3>Personal Information</h3>
                    <p><strong>Phone:</strong> {userData.phone}</p>
                    <p><strong>Address:</strong> {userData.address}</p>
                </div>

                <div className={styles.profile_actions}>
                    <button className={styles.edit_profile_button}>Edit Profile</button>
                    <button className={styles.change_password_button}>Change Password</button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
