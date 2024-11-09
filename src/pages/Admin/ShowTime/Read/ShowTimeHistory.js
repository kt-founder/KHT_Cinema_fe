import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './ShowTimeHistory.css'; // Đảm bảo tạo file CSS tương ứng cho giao diện

function ShowtimeTable() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showtimes, setShowtimes] = useState([]); // Dữ liệu về suất chiếu


    const fetchShowtimes = async (date) => {
        try {
            const formattedDate = date.toLocaleDateString("en-CA"); // Định dạng thành YYYY-MM-DD
            const response = await fetch(`http://localhost:8080/showtimes/admin/get-all-showtime`);
            const data = await response.json();
            console.log(data.data)
            setShowtimes(data.data);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu suất chiếu:", error);
            setShowtimes([]);
        }
    };
    useEffect(() => {
        fetchShowtimes(selectedDate);
    }, [selectedDate]);


    return (
        <div className="showtime-table-container">

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
                            <td>{showtime.movie.title}</td>
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
                            <td>{showtime.cinemaHall.name}</td>
                            <td>{new Date(showtime.dateCreate).toLocaleDateString('en-GB')
                            }
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4">Không có suất chiếu cho ngày này.</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default ShowtimeTable;
