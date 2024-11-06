import React, { useState } from "react";
import styles from "./ShowTimeCreate.module.css";
import axios from "axios";

function ShowTimeCreate() {
    const [dates, setDates] = useState([]); // Danh sách ngày được chọn
    const [dayInput, setDayInput] = useState(""); // Giá trị ngày nhập vào
    const [monthInput, setMonthInput] = useState(""); // Giá trị tháng nhập vào
    const [yearInput, setYearInput] = useState(""); // Giá trị năm nhập vào
    const [currentDateIndex, setCurrentDateIndex] = useState(null); // Ngày đang chọn giờ
    const [hourInput, setHourInput] = useState(""); // Giờ nhập vào
    const [minuteInput, setMinuteInput] = useState(""); // Phút nhập vào
    const [availableRooms, setAvailableRooms] = useState([]); // Danh sách phòng khả dụng
    const [selectedRoom, setSelectedRoom] = useState(null); // Phòng đã chọn cho giờ chiếu
    const [editingIndex, setEditingIndex] = useState(null); // Chỉ số giờ chiếu đang được sửa
    const [error, setError] = useState(""); // Thông báo lỗi khi nhập sai
    const [currentRoomSelection, setCurrentRoomSelection] = useState(null); // Lưu chỉ số của giờ chiếu cần chọn phòng
    const [searchTerm, setSearchTerm] = useState(''); // Dữ liệu tìm kiếm
    const [searchResults, setSearchResults] = useState([]); // Kết quả tìm kiếm
    const [showSearchResults, setShowSearchResults] = useState(false); // Hiển thị kết quả tìm kiếm
    const [selectedMovie, setSelectedMovie] = useState({
        movieId:'',
        movieName:''
    }); // Tên phim đã chọn
    // Gọi API tìm kiếm
    const handleSearch = async () => {
        if (searchTerm) {
            try {
                const response = await fetch(`http://localhost:8080/movies/search-movie?keyword=${searchTerm}`);
                const data = await response.json();
                console.log(data)
                setSearchResults(data.data);
                setShowSearchResults(true);
            } catch (error) {
                console.error("Lỗi khi tìm kiếm:", error);
            }
        }
    };

    // Hàm kiểm tra định dạng ngày
    const isValidDate = (day, month, year) => {
        const dayInt = parseInt(day, 10);
        const monthInt = parseInt(month, 10);
        const yearInt = parseInt(year, 10);

        if (dayInt < 1 || dayInt > 31 || monthInt < 1 || monthInt > 12 || yearInt < 1900) {
            return false;
        }
        if ((monthInt === 4 || monthInt === 6 || monthInt === 9 || monthInt === 11) && dayInt > 30) {
            return false;
        }
        if (monthInt === 2) {
            const isLeapYear = (yearInt % 4 === 0 && yearInt % 100 !== 0) || yearInt % 400 === 0;
            if ((isLeapYear && dayInt > 29) || (!isLeapYear && dayInt > 28)) {
                return false;
            }
        }
        return true;
    };

    // Hàm thêm ngày vào danh sách nếu hợp lệ và không trùng
    const handleAddDate = () => {
        if (!isValidDate(dayInput, monthInput, yearInput)) {
            setError("Ngày không hợp lệ. Vui lòng kiểm tra lại.");
            return;
        }

        const formattedDate = `${dayInput.padStart(2, "0")}/${monthInput.padStart(2, "0")}/${yearInput}`;
        const isDuplicate = dates.some((d) => d.date === formattedDate);

        if (isDuplicate) {
            setError("Ngày này đã tồn tại trong danh sách");
        } else {
            setDates([...dates, { date: formattedDate, times: [] }]);
            setDayInput("");
            setMonthInput("");
            setYearInput("");
            setError("");
        }
    };

    // Hàm kiểm tra định dạng giờ 24h
    const isValidTimeFormat = (hour, minute) => {
        const isValidHour = /^([01]?[0-9]|2[0-3])$/.test(hour);
        const isValidMinute = /^[0-5]?[0-9]$/.test(minute);
        return isValidHour && isValidMinute;
    };

    // Hàm thêm giờ vào một ngày đã chọn
    const handleAddTime = (index) => {
        if (!isValidTimeFormat(hourInput, minuteInput)) {
            setError("Giờ hoặc phút không đúng định dạng.");
            return;
        }

        const formattedTime = `${hourInput.padStart(2, "0")}:${minuteInput.padStart(2, "0")}`;
        const newDates = [...dates];
        const isDuplicate = newDates[index].times.some((t) => t.time === formattedTime);

        if (isDuplicate) {
            setError("Giờ này đã tồn tại trong danh sách");
        } else {
            newDates[index].times.push({ time: formattedTime, room: null });
            setDates(newDates);
            setHourInput("");
            setMinuteInput("");
            setSelectedRoom(null);
            setError("");
        }
    };

    // Hàm gọi API kiểm tra phòng trống
    const handleCheckRoomAvailability = async (dateIndex, timeIndex) => {
        const date = dates[dateIndex].date;
        const time = dates[dateIndex].times[timeIndex].time;
        const formattedDate = date.split('/').reverse().join('-'); // Chuyển thành dạng YYYY-MM-DD
        const dateTime = `${formattedDate}T${time}`;
        console.log(dateTime)
        try {
            const response = await fetch(`http://localhost:8080/cinema-halls/check-avaiable-room?time=${encodeURIComponent(dateTime)}`);
            const rooms = await response.json();
            setAvailableRooms(rooms.data);
            console.log(availableRooms)
            setCurrentRoomSelection({ dateIndex, timeIndex });
        } catch (error) {
            console.error("Lỗi khi kiểm tra phòng trống:", error);
        }
    };

    // Hàm chọn phòng từ danh sách phòng khả dụng
    const handleSelectRoom = (room) => {
        const { dateIndex, timeIndex } = currentRoomSelection;
        const newDates = [...dates];
        newDates[dateIndex].times[timeIndex].room = room;
        setDates(newDates);
        setAvailableRooms([]);
        setCurrentRoomSelection(null); // Đặt lại sau khi chọn phòng
    };

    const handleDeleteDate = (index) => {
        const newDates = [...dates];
        newDates.splice(index, 1);
        setDates(newDates);
    };

    const handleDeleteTime = (dateIndex, timeIndex) => {
        const newDates = [...dates];
        newDates[dateIndex].times.splice(timeIndex, 1);
        setDates(newDates);
    };
    const handleConfirmSave = async () => {
        const now = new Date();
        const localDateTime = now.toLocaleString();

        // Giả định `selectedMovie` đã được chọn và chứa `movieId`
        const formattedDate = dates.map((dateItem) => {
            const formattedDate = dateItem.date.split("/").reverse().join("-"); // Định dạng thành YYYY-MM-DD
            const times = dateItem.times.map((timeItem) => {
                const dateTimeString = `${formattedDate}T${timeItem.time}`;
                return {
                    timeStart: dateTimeString, // Định dạng thành YYYY-MM-DDTHH:mm
                    roomId: timeItem.room ? timeItem.room.id : "Chưa chọn",
                };
            });
            return {
                movieId: selectedMovie.movieId,
                timeSheet: times,
            };
        })[0]; // Lấy phần tử đầu tiên của mảng để chỉ lấy đối tượng

        // Log JSON dữ liệu đã định dạng để gửi lên backend
        try {
            const response = await fetch('http://localhost:8080/showtimes/admin/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Đảm bảo Content-Type là application/json
                },
                body: JSON.stringify(formattedDate), // Chuyển đổi dữ liệu thành JSON
            });
            const data = await response.json();
            console.log("Response:", data);
            if (data.message){
                window.location.href = 'showtime'
            }
        } catch (error) {
            console.error("Error:", error);
        }
        // console.log(JSON.stringify(formattedDate,null,2));
    };
    const callApi =  async (data) => {
        try {
            const response = await axios.post(`http://localhost:8080/showtimes/admin/create`, data);
            const rooms = response.data;
            if (rooms.message){
                window.location.href = 'admin/showtime'
            }
        } catch (error) {
            console.error("Lỗi khi kiểm tra phòng trống:", error);
        }
    }
    const handleSelectMovie = (movieTitle, movieId) => {
        setSelectedMovie({
            movieId: movieId,
            movieName: movieTitle
        }); // Lưu tên phim đã chọn
        setShowSearchResults(false); // Ẩn bảng kết quả sau khi chọn
    };
    return (
        <div style={{textAlign:'center'}}>
            <div>
                <div className={styles.search_container}>
                    <input
                        type="text"
                        placeholder="Nhập thông tin tìm kiếm..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.search_input}
                    />
                    <div className={styles.add_button} onClick={handleSearch}>
                        Tìm kiếm
                    </div>
                </div>
            </div>
            {showSearchResults && (
                <div>
                    <table className={styles.results_table} style={{padding: '8px'}}>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên Phim</th>
                            <th>Thời lượng</th>
                            <th>Năm ra mắt</th>
                        </tr>
                        </thead>
                        <tbody>
                        {searchResults.map((result) => (
                            <tr key={result.id}>
                                <td>{result.id}</td>
                                <td>{result.title}</td>
                                <td>{result.duration}</td>
                                <td>{result.releaseDate}</td>
                                <td>
                                    <div
                                        className={styles.add_button}
                                        onClick={() => handleSelectMovie(result.title, result.id)}
                                    >
                                        Chọn
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            <hr/>
            {selectedMovie && (
                <div className={styles.selected_movie}>
                    <h3>Phim đã chọn: {selectedMovie.movieName}</h3>
                </div>
            )}
            {1 && (
                <div className={styles.app}>
                    <div className={styles.date_input_block}>
                        <input
                            type="text"
                            placeholder="Ngày"
                            value={dayInput}
                            onChange={(e) => setDayInput(e.target.value)}
                            className={styles.date_input}
                        />
                        <input
                            type="text"
                            placeholder="Tháng"
                            value={monthInput}
                            onChange={(e) => setMonthInput(e.target.value)}
                            className={styles.date_input}
                        />
                        <input
                            type="text"
                            placeholder="Năm"
                            value={yearInput}
                            onChange={(e) => setYearInput(e.target.value)}
                            className={styles.date_input}
                        />
                        <div onClick={handleAddDate} className={styles.add_button}>
                            Lưu ngày
                        </div>
                    </div>

                    {error && <p className={styles.error_message}>{error}</p>}

                    <div className={styles.dates_list}>
                        {dates.map((item, dateIndex) => (
                            <div key={dateIndex} className={styles.date_block}>
                                <div className={styles.date_header}>
                                    <span>Ngày: {item.date}</span>
                                    <div
                                        onClick={() => handleDeleteDate(dateIndex)}
                                        className={styles.delete_button}
                                    >
                                        Xóa ngày
                                    </div>
                                </div>

                                <div
                                    onClick={() => setCurrentDateIndex(dateIndex)}
                                    className={styles.add_button}
                                >
                                    Thêm giờ
                                </div>

                                <div className={styles.times_list}>
                                    {item.times.map((timeObj, timeIndex) => (
                                        <div key={timeIndex} className={styles.time_item}>
                                            {timeObj.time}
                                            {timeObj.room ? (
                                                ` (Phòng: ${timeObj.room.name})`
                                            ) : (
                                                <div
                                                    onClick={() =>
                                                        handleCheckRoomAvailability(dateIndex, timeIndex)
                                                    }
                                                    className={styles.check_button}
                                                >
                                                    Kiểm tra phòng
                                                </div>
                                            )}
                                            <div
                                                onClick={() => handleDeleteTime(dateIndex, timeIndex)}
                                                className={styles.delete_button}
                                            >
                                                X
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {currentDateIndex === dateIndex && editingIndex === null && (
                                    <div className={styles.time_input_block}>
                                        <input
                                            type="text"
                                            placeholder="Giờ (0-23)"
                                            value={hourInput}
                                            onChange={(e) => setHourInput(e.target.value)}
                                            className={styles.time_input}
                                        />
                                        <span>:</span>
                                        <input
                                            type="text"
                                            placeholder="Phút (0-59)"
                                            value={minuteInput}
                                            onChange={(e) => setMinuteInput(e.target.value)}
                                            className={styles.time_input}
                                        />
                                        <div
                                            onClick={() => handleAddTime(dateIndex)}
                                            className={styles.time_button}
                                        >
                                            Lưu giờ
                                        </div>
                                        <div
                                            onClick={() => setCurrentDateIndex(null)}
                                            className={styles.close_button}
                                        >
                                            Tắt
                                        </div>
                                    </div>
                                )}

                                {availableRooms.length > 0 &&
                                    currentRoomSelection &&
                                    currentRoomSelection.dateIndex === dateIndex && (
                                        <div className={styles.room_list}>
                                            {availableRooms.map((room) => (
                                                <div
                                                    key={room.id}
                                                    onClick={() => handleSelectRoom(room)}
                                                    className={styles.room_button}
                                                >
                                                    {room.name} - {room.capacity} chỗ
                                                </div>
                                            ))}
                                        </div>
                                    )}
                            </div>
                        ))}
                    </div>

                </div>
            )}
            <div
                style={{
                    display: "flex",
                    textAlign: "center",
                    alignItems: "center",
                    margin: "0 35% 0 40%",
                }}
            >
                <div
                    onClick={handleConfirmSave}
                    className={styles.add_button}
                    style={{width: "100px", marginRight:'20px'}}
                >
                    Quay lại
                </div>
                <div
                    onClick={handleConfirmSave}
                    className={styles.add_button}
                    style={{width: "100px"}}
                >
                    Xác nhận lưu
                </div>
            </div>
        </div>
    );
}

export default ShowTimeCreate;
