import React, {useEffect, useState} from 'react';
import './MovieTable.css';
import {notification, Spin} from "antd";
import LoadingComponent from "../../components/LoadingComponent";
const StatusTicket = () => {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/tickets/get-status-ticket');
            const result = await response.json();

            const formattedData = result.data.map(item => {
                const date = new Date(item.time);
                const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')} ${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
                return {
                    ...item,
                    time: formattedTime
                };
            });

            setStatus(formattedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false)
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    if (isLoading) {
        return <LoadingComponent />;
    }
    return (
        <div className="movie-container">
            <div className="movie-header">
            </div>
            <table className="movie-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Movie</th>
                    <th>Room</th>
                    <th>Price</th>
                    <th style={{textAlign:'center'}}>Status</th>
                    <th>Payment Date</th>
                </tr>
                </thead>
                <tbody>
                {status != null && status.map((s) => (
                    <tr key={s.id}>
                        <td>{s.id}</td>
                        <td>{s.movie}</td>
                        <td>{s.room}</td>
                        <td>{new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        })
                            .format(s.price)
                            .replace("₫", "VNĐ")}</td>
                        <td style={{textAlign: 'center'}}>
                            {s.status.toString() === 'true' ?
                                <span style={{
                                    color: 'green',
                                    border: '2px solid green',
                                    padding: '4px'
                                }}>Đã thanh toán</span>
                                :
                                <span style={{color: 'orange', border: '2px solid orange', padding: '4px'}}>Đang chờ thanh toán</span>
                            }
                        </td>
                        <td>{s.status.toString() === 'true' ? s.time : null}</td>
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

export default StatusTicket;
