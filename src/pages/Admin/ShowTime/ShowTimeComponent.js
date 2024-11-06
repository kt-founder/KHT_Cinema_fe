import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import s from './ShowTimeComponent.module.css';

function ShowTimeComponent() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [schedule, setSchedule] = useState({}); // Lưu lịch chiếu theo cấu trúc { "Tên phim": [{ time, room }] }

    // Hàm gọi API lấy lịch chiếu
    const fetchSchedule = async (date) => {
        try {
            const url = `http://localhost:8080/showtimes/admin/get-list?date=${encodeURIComponent(date)}`;
            console.log("Request URL:", url);

            const response = await fetch(url);
            const data = await response.json();
            console.log("Response data:", data.data);

            if (data && data.data) {
                const formattedData = formatScheduleData(data.data); // Xử lý dữ liệu để gộp theo tên phim
                setSchedule(formattedData); // Lưu lịch chiếu đã định dạng vào state
            } else {
                console.error("Dữ liệu không đúng định dạng:", data);
                setSchedule({});
            }
        } catch (error) {
            console.error("Lỗi khi lấy lịch chiếu:", error);
            setSchedule({});
        }
    };

    // Gọi API lấy lịch chiếu ngày hôm nay khi component được tải lần đầu
    useEffect(() => {
        const today = new Date();
        const localDate = today.toLocaleDateString("en-CA"); // Định dạng thành YYYY-MM-DD
        fetchSchedule(localDate); // Gọi API với ngày hiện tại
    }, []);

    // Hàm xử lý khi người dùng chọn ngày mới trên DatePicker
    const handleDateChange = (date) => {
        setSelectedDate(date);
        const localDate = date.toLocaleDateString("en-CA"); // Định dạng thành YYYY-MM-DD
        setShowDatePicker(false); // Ẩn DatePicker sau khi chọn ngày
        fetchSchedule(localDate); // Gọi API lấy lịch chiếu cho ngày đã chọn
    };

    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker);
    };

    const createShowTime = () => {
        window.location.href = '/admin/create-show-time';
    };
    const showHistory = () => {
        window.location.href = '/admin/history-create-showtime';
    }
    return (
        <div>
            <div className={s.top_buttons}>
                <div className={s.btn_style} onClick={toggleDatePicker}>Lịch</div>
                <div className={s.btn_style} onClick={createShowTime}>Thêm suất chiếu</div>
                <div className={s.btn_style} onClick={showHistory}>Xem lịch sử thêm</div>
            </div>
            <div className={s.date_display}>
                {showDatePicker && (
                    <DatePicker selected={selectedDate} onChange={handleDateChange} inline />
                )}
                <div>Ngày chiếu: {selectedDate.toLocaleDateString()}</div>
            </div>

            <div className={s.movie_schedule}>
                {Object.keys(schedule).length > 0 ? (
                    Object.entries(schedule).map(([movieTitle, times]) => (
                        <div key={movieTitle} style={{ marginBottom: '20px' }}>
                            <h2>{movieTitle}</h2>
                            <ul>
                                {times.map((timeSlot, index) => (
                                    <li key={index}>
                                        Giờ chiếu: {timeSlot.time}, Phòng chiếu: {timeSlot.room}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                ) : (
                    <spanp>Không có lịch chiếu cho ngày này.</spanp>
                )}
            </div>
        </div>
    );
}

// Hàm format dữ liệu - gộp các suất chiếu của từng phim vào một danh sách
const formatScheduleData = (data) => {
    const movieSchedule = {};

    data.forEach(showtime => {
        const movieTitle = showtime.movie.title;
        const startTime = new Date(showtime.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const cinemaHall = showtime.cinemaHall.name;

        // Nếu phim chưa tồn tại trong movieSchedule, thêm một mảng rỗng cho phim đó
        if (!movieSchedule[movieTitle]) {
            movieSchedule[movieTitle] = [];
        }

        // Thêm giờ chiếu và phòng chiếu vào danh sách cho phim này
        movieSchedule[movieTitle].push({
            time: startTime,
            room: cinemaHall,
        });
    });

    return movieSchedule;
};

export default ShowTimeComponent;
