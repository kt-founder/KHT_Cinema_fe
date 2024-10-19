import React, {useEffect, useState} from "react";
import Api from "../../Confligs/Api";
import {notification, Spin} from "antd";

const UserTable = () => {
    const [users, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true)
        // Sử dụng axiosInstance để gửi request
        Api.GetAllUser()
            .then((response) => {
                setData(response.data.data);
                setLoading(false)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    const disable = (id) => {
        Api.DisableUser(id).then((res) => {
            if (res.data.message === 'Successful'){
                notification["success"]({
                    message: "Change status user successful",
                });
                window.location.reload()
            }
        }).catch((err)=>{
            console.log(err)
            notification["error"]({
                message: "Change status user not successful",
            });
        })
    }
    return (
        <div className="movie-container">
            <div className="movie-header">
                <div className="search-box">
                    <input type="text" placeholder="Search..."/>
                    <i className="fas fa-search"></i>
                </div>
            </div>
            <table className="movie-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Sdt</th>
                    <th>isActive</th>
                    <th style={{textAlign: 'center'}}>Action</th>
                </tr>
                </thead>
                <tbody>
                {users != null && users.map((u) => (
                    <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.name}</td>
                        <td>{u.username}</td>
                        <td>{u.email}</td>
                        <td>{u.phone}</td>
                        <td>{u.isActive.toString()}</td>
                        <td className="action-buttons">
                            <button className="delete-button">
                                {u.isActive ?
                                    <i className="fa-solid fa-lock" onClick={() => disable(movie.id)}></i>
                                    :
                                    <i className="fa-solid fa-unlock" onClick={() => disable(movie.id)}></i>}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div style={{marginTop: '20px'}}>
                {loading ? (
                        <Spin tip="Loading..." size="large"/>
                    ) :
                    null
                }
            </div>
        </div>
    );
};

export default UserTable;