import React, {useEffect, useState} from 'react';
import {notification, Spin} from "antd";
import {useLocation, useNavigate} from "react-router-dom";
import BookingRDialog from "../../components/BookingRDialog";
import LoadingComponent from "../../components/LoadingComponent";
const BookingHistory = () => {
    const [booking, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const data = location.state;
    const [isLoading, setIsLoading] = useState(true);
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
                const formattedData = result.data.map(item => {
                    const date = new Date(item.dateBooking);
                    const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')} ${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
                    return {
                        ...item,
                        dateBooking: formattedTime
                    };
                });
                setData(formattedData)
                setLoading(false)
            } else {
                console.error("Err1:", result.message);
            }
        } catch (error) {
            console.error("Err2:", error);
        } finally {
            setIsLoading(false)
        }
    };
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Quay lại trang trước
    };
    if (isLoading) {
        return <LoadingComponent />;
    }
    return (

        <div className="movie-container">
            <div className="movie-header">
                <div onClick={handleBack} style={{
                    padding: '8px',
                    backgroundColor: 'orange',
                    cursor: 'pointer',
                    width: '10%',
                    textAlign: 'center',
                    marginTop: '20px'
                }}>
                    <i className="fa fa-arrow-left" aria-hidden="true"></i><span
                    style={{marginLeft: '10px'}}>Back</span>
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
                        <td>{new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        })
                            .format(b.price)
                            .replace("₫", "VNĐ")}</td>
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
