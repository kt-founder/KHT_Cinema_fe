import React from 'react';
import styles from '../styles/UserProfile.module.css';
import UserEDialog from "../../components/UserEDialog";

const Profile = () => {
    const getBack = () => {
        window.history.back()
    }
    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <div className={styles.sidebarHeader} style={{marginTop:'20px', cursor:'pointer'}} onClick={getBack}>
                    <i className="fa fa-chevron-left" aria-hidden="true" style={{marginRight:'10px'}}></i>Quay lại
                </div>
                <ul className={styles.sidebarMenu}>
                    <li className={styles.active}>Public profile</li>
                    <UserEDialog/>
                    <li>Change password</li>
                    <li>History booking</li>
                </ul>
            </div>

            <div className={styles.mainContent}>
                <div className={styles.profileHeader}>
                    <h2>Public profile</h2>
                </div>
                <div className={styles.profilePicture} style={{textAlign:'center'}}>
                    <img src="https://via.placeholder.com/150" alt="Profile"/>
                </div>
                <div className={styles.profileDetails}>
                    <div className={styles.profileInfo}>
                        <label>Name</label>
                        <input type="text"  disabled={true} style={{color: '#13b3b3', marginBottom:'30px'}} value="Name"/>

                        <label>Username</label>
                        <input type="text" disabled={true} style={{color: '#13b3b3', marginBottom:'30px'}} value="Name"/>

                        <label>Public email</label>
                        <input type="email" disabled={true} style={{color: '#13b3b3', marginBottom:'30px'}} value="Name"/>

                        <label>Phone</label>
                        <input disabled={true} style={{color: '#13b3b3', marginBottom:'30px'}} value="Name"></input>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
