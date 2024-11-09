import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import s from './ShowTimeComponent.module.css';

function ShowTimeComponent() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [sortedData, setSortedData] = useState({});

    const fetchSchedule = async (date) => {
        try {
            const url = `http://localhost:8080/showtimes/admin/get-list?date=${encodeURIComponent(date)}`;
            console.log("Request URL:", url);

            const response = await fetch(url);
            const data = await response.json();
            console.log("Response data:", data.data);

            if (data && data.data) {
                const sorted = sortShowtimes(data.data);
                setSortedData(sorted);
            } else {
                console.error("Dữ liệu không đúng định dạng:", data);
                setSortedData({});
            }
        } catch (error) {
            console.error("Lỗi khi lấy lịch chiếu:", error);
            setSortedData({});
        }
    };
    const sortShowtimes = (data) => {
        return Object.entries(data)
            .sort(([movieA], [movieB]) => movieA.localeCompare(movieB))
            .reduce((acc, [movieTitle, showtimes]) => {
                acc[movieTitle] = showtimes.sort((a, b) => {
                    const [hourA, minuteA] = a.split(' - ')[0].split(':').map(Number);
                    const [hourB, minuteB] = b.split(' - ')[0].split(':').map(Number);
                    return hourA - hourB || minuteA - minuteB;
                });
                return acc;
            }, {});
    };

    useEffect(() => {
        const today = new Date();
        const localDate = today.toLocaleDateString("en-CA");
        fetchSchedule(localDate);
    }, []);


    const handleDateChange = (date) => {
        setSelectedDate(date);
        const localDate = date.toLocaleDateString("en-CA");
        setShowDatePicker(false);
        fetchSchedule(localDate);
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
                    <DatePicker selected={selectedDate} onChange={handleDateChange} inline/>
                )}
                <div><span style={{fontSize:'20px'}}>Lịch chiếu ngày: {selectedDate.toLocaleDateString()}</span></div>
            </div>
            <div className={s.movie_schedule}>
                {Object.keys(sortedData).length !== 0 ?
                    (Object.entries(sortedData).map(([movieTitle, showtimes]) => (
                    <div key={movieTitle}>
                        <h2 style={{color:'black'}}>{movieTitle}</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
                            {showtimes.map((showtime, index) => (
                                <div style={{border:'solid 2px #f123', padding:'8px 0 8px 0', margin:'8px', width:'125px'}} key={index}>{showtime}</div>
                            ))}
                        </div>
                        <hr/>
                    </div>

                    )))
                    :
                    (<spanp>Không có lịch chiếu cho ngày này.</spanp>)
                }
            </div>
        </div>
    );
}

export default ShowTimeComponent;
