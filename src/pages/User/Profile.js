import React from 'react';
import styles from '../styles/UserProfile.module.css'; // Import CSS Module

const UserProfile = () => {
    const userData = {
        avatar: 'https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/428599304_1499685833928714_4324826180300874868_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=CQ43KwvrW7YQ7kNvgEUSGXc&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_gid=AZ2_MVSVz-SpsZb1ebyk8d9&oh=00_AYAj17cFhdDSqo4ssX7JdAdNCdW52Sa1QR_oISPsDTzMMA&oe=671801B6',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+123 456 7890',
        address: '123 Main Street, City, Country',
    };

    return (
        <div className={styles.profile_container}>
            {/* Header with background image */}
            <div className={styles.header_background}>
                <button className={styles.back_button}>Quay lại</button>
                <div className={styles.header_content}>
                    <img src={userData.avatar} alt="Avatar" className={styles.profile_avatar}/>
                    <h2 className={styles.profile_name}>{userData.name} <span className={styles.edit_icon}>✏️</span></h2>
                </div>
            </div>

            {/* Personal Information */}
            <div className={styles.profile_details}>
                <h3>Thông tin cá nhân</h3>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Phone:</strong> {userData.phone}</p>
                <p><strong>Address:</strong> {userData.address}</p>
            </div>

            {/* Update Button */}
            <div className={styles.update_button_container}>
                <button className={styles.update_button}>Cập nhật</button>
            </div>
        </div>
    );
};

export default UserProfile;
