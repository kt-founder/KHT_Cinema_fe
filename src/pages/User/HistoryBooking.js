import React, {useEffect, useState} from 'react';
import MovieCDialog from "../../components/MovieCDialog"; // File CSS được cập nhật bên dưới
import Api from '../../Confligs/Api'
import {notification, Spin} from "antd";
import MovieRDialog from "../../components/MovieRDialog";
import MovieEDialog from "../../components/MovieEDialog";
import {useLocation} from "react-router-dom";
import BookingRDialog from "../../components/BookingRDialog";
const BookingHistory = () => {
    const [booking, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const data = location.state;
    useEffect(() => {
        setLoading(true)
        fetchSchedule(data)
    }, []);
    const fetchSchedule = async (data) => {
        try {
            const url = `http://localhost:8080/tickets/get-by-user/${data}`;
            console.log("Request URL:", url);

            const response = await fetch(url);

            const result = await response.json();
            console.log("Response data:", result.data);

            if (result && result.data) {
                setData(result.data)
                setLoading(false)
            } else {
                console.error("Err1:", result.message);
            }
        } catch (error) {
            console.error("Err2:", error);
        }
    };
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
                    <th>Mã đơn</th>
                    <th>Ngày thanh toán</th>
                    <th>Tổng tiền</th>
                    <th style={{textAlign: 'center'}}>Action</th>
                </tr>
                </thead>
                <tbody>
                {booking != null && booking.map((b) => (
                    <tr key={b.id}>
                        <td>{b.id}</td>
                        <td>{b.dateBooking}</td>
                        <td>{b.price}</td>
                        <td className="action-buttons">
                            <BookingRDialog booking = {b}/>
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

export default BookingHistory;
