import React, {useEffect, useState} from 'react';
import styles from '../styles/UserProfile.module.css';
import UserEDialog from "../../components/UserEDialog";
import Api from "../../Confligs/Api";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const [user, setData] = useState({
        id: '',
        name: '',
        username: '',
        phone: '',
        email: ''
    });
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true)
        Api.GetMyInFor()
            .then((response) => {
                setData(response.data.data);
                setLoading(false)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    const getBack = () => {
        window.location.href = '/'
    }

    const navigate = useNavigate();
    const getHistory = () => {
        if (user) {
            navigate('/history-booking', { state: user.id,replace:true });
        } else {
            console.error("Data is empty or undefined");
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <div className={styles.sidebarHeader} style={{marginTop:'20px', cursor:'pointer'}} onClick={getBack}>
                    <i className="fa fa-chevron-left" aria-hidden="true" style={{marginRight:'10px'}}></i>Quay lại
                </div>
                <ul className={styles.sidebarMenu}>
                    <li className={styles.active}>Public profile</li>
                    <UserEDialog user = {user}/>
                    <li>Change password</li>
                    <li onClick={getHistory}>History booking</li>
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
                    {user && <div className={styles.profileInfo}>
                        <label>Name</label>
                        <input type="text" disabled={true} style={{color: '#13b3b3', marginBottom: '30px'}}
                               value={user.name != null ? user.name : null}/>

                        <label>Username</label>
                        <input type="text" disabled={true} style={{color: '#13b3b3', marginBottom: '30px'}}
                               value={user.username != null ? user.username : null}/>

                        <label>Email</label>
                        <input type="email" disabled={true} style={{color: '#13b3b3', marginBottom: '30px'}}
                               value={user.email != null ? user.email : null}/>

                        <label>Phone</label>
                        <input disabled={true} style={{color: '#13b3b3', marginBottom: '30px'}}
                               value={user.phone != null ? user.phone : null}></input>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default Profile;
