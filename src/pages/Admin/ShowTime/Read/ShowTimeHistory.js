import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './ShowTimeHistory.css';
import {Spin} from "antd"; // Đảm bảo tạo file CSS tương ứng cho giao diện

function ShowtimeTable() {
    const [loading, setLoading] = useState(false);
    const [showtimes, setShowtimes] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const fetchShowtimes = async () => {
        try {
            const response = await fetch(`http://localhost:8080/showtimes/admin/get-all-showtime?page=${page}`);
            const data = await response.json();
            console.log(data.data)
            setShowtimes(data.data.showtime);
            setTotalPage(data.data.totalPages);
            setLoading(false);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu suất chiếu:", error);
            setShowtimes([]);
        }
    };
    useEffect(() => {
        setLoading(true)
        fetchShowtimes();
    }, [page]);

    const choosePage = (pageNumber) => {
        setPage(pageNumber)
        console.log("click page: ", pageNumber)
        // fetchShowtimes();
    }
    const Back = () => {
        window.location.href = 'showtime'
    }
    return (
        <div className="showtime-table-container">
            <div style={{
                padding: '8px', border: 'solid #d3c8c8 1px', width: '100px', cursor: 'pointer', background: '#dfd9d9'
            }} onClick={Back}>Quay lại
            </div>
            <table className="showtime-table">
                <thead>
                <tr>
                    <th>Tên phim</th>
                    <th>Ngày chiếu</th>
                    <th>Giờ bắt đầu</th>
                    <th>Giờ kết thúc</th>
                    <th>Phòng chiếu</th>
                    <th>Ngày tạo</th>
                </tr>
                </thead>
                <tbody>
                {showtimes.length > 0 ? (
                    showtimes.map((showtime) => (
                        <tr key={showtime.id}>
                            <td>{showtime.movie}</td>
                            <td>{new Date(showtime.startTime).toLocaleDateString('en-GB')
                            }
                            </td>
                            <td>{new Date(showtime.startTime).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}</td>
                            <td>{new Date(showtime.endTime).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}</td>
                            <td>{showtime.nameRoom}</td>
                            <td>{new Date(showtime.dateCreate).toLocaleDateString('en-GB')
                            }
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4">Không có dữ liệu.</td>
                    </tr>
                )}
                </tbody>
            </table>
            <div style={{marginTop: '20px'}}>
                {loading ? (
                        <Spin tip="Loading..." size="large"/>
                    ) :
                    null
                }
            </div>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
                {Array.from({length: totalPage}).map((_, index) => (
                    <div style={{padding: '8px'}}>
                        <div key={index} onClick={() => choosePage(index)}
                             style={{
                                 padding: '8px', border: 'solid black 1px',
                                 cursor: 'pointer',
                                 background: page === index ? '#89CFF0' : ''
                             }}>
                            {index + 1}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShowtimeTable;
