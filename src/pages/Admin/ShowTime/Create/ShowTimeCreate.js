import React, {useEffect, useState} from "react";
import styles from "./ShowTimeCreate.module.css";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import LoadingComponent from "../../../../components/LoadingComponent";

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
        movieName:'',
        duration:''
    });
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const data = location.state;

    useEffect(() => {
        if (data) {
            console.log("Data received:", data);
            handleAddDate(data)
        } else {
            console.warn("Data is missing.");
        }
    }, [data]);


    const handleSearch = async () => {
        if (searchTerm) {
            setIsLoading(true)
            try {
                const response = await fetch(`http://localhost:8080/movies/search-movie?keyword=${searchTerm}`);
                const data = await response.json();
                console.log(data)
                setSearchResults(data.data);
                setShowSearchResults(true);
                setIsLoading(false)
            } catch (error) {
                console.error("Lỗi khi tìm kiếm:", error);
            }
        }
    };

    const Back = () => {
        window.location.href = '/admin/showtime'
    }
    const handleAddDate = (x) => {
        setDates([...dates, { date: x, times: [] }]);
    };

    const isValidTimeFormat = (hour, minute) => {
        const isValidHour = /^([01]?[0-9]|2[0-3])$/.test(hour);
        const isValidMinute = /^[0-5]?[0-9]$/.test(minute);
        return isValidHour && isValidMinute;
    };


    const handleAddTime = (index) => {
        if (!isValidTimeFormat(hourInput, minuteInput)) {
            setError("Giờ hoặc phút không đúng định dạng.");
            return;
        }
        const today = new Date();
        const selectedDate = dates[index].date.split("/");
        const selectedDay = parseInt(selectedDate[0]);
        const selectedMonth = parseInt(selectedDate[1]) - 1;
        const selectedYear = parseInt(selectedDate[2]);
        const formattedTime = `${hourInput.padStart(2, "0")}:${minuteInput.padStart(2, "0")}`;
        const newTime = new Date(selectedYear, selectedMonth, selectedDay, parseInt(hourInput), parseInt(minuteInput));
        const minimumAllowedTime = new Date(today.getTime() + 2 * 60 * 60 * 1000);
        if (
            selectedDay === today.getDate() &&
            selectedMonth === today.getMonth() &&
            selectedYear === today.getFullYear() &&
            newTime <= minimumAllowedTime
        ) {
            setError("Giờ chiếu phải muộn hơn giờ hiện tại ít nhất 2 tiếng.");
            return;
        }
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

    const handleCheckRoomAvailability = async (dateIndex, timeIndex) => {
        if (selectedMovie.duration === ''){
            setError("Vui lòng chọn phim muốn tạo suất chiếu")
            return
        }
        setIsLoading(true)
        const date = dates[dateIndex].date; // Ngày chiếu
        const time = dates[dateIndex].times[timeIndex].time;
        const formattedDate = date.split('/').reverse().join('-');
        const dateTime = `${formattedDate}T${time}`;
        const movieDuration = selectedMovie.duration.split(" ")[0];

        try {
            const response = await fetch(`http://localhost:8080/cinema-halls/check-avaiable-room?time=${encodeURIComponent(dateTime)}`);
            const rooms = await response.json();

            const filteredRooms = rooms.data.filter(room => {
                return !dates[dateIndex].times.some(existingTime => {
                    if (!existingTime.room) return false; // Nếu suất chiếu chưa chọn phòng, bỏ qua
                    const existingTimeInMinutes = parseInt(existingTime.time.split(":")[0]) * 60 + parseInt(existingTime.time.split(":")[1]); // Thời gian phút của suất chiếu cũ
                    const currentTimeInMinutes = parseInt(time.split(":")[0]) * 60 + parseInt(time.split(":")[1]); // Thời gian phút của suất chiếu mới
                    const timeDifference = Math.abs(currentTimeInMinutes - existingTimeInMinutes); // Khoảng cách thời gian giữa 2 suất chiếu

                    return (
                        room.id === existingTime.room.id &&
                        timeDifference < movieDuration
                    );
                });
            });

            setAvailableRooms(filteredRooms);
            setCurrentRoomSelection({ dateIndex, timeIndex });
            setIsLoading(false)
        } catch (error) {
            console.error("Lỗi khi kiểm tra phòng trống:", error);
        }
    };



    const handleSelectRoom = (room) => {
        const { dateIndex, timeIndex } = currentRoomSelection;
        const newDates = [...dates];
        newDates[dateIndex].times[timeIndex].room = room;
        setDates(newDates);
        setAvailableRooms([]);
        setCurrentRoomSelection(null);
    };


    const handleDeleteTime = (dateIndex, timeIndex) => {
        const newDates = [...dates];
        newDates[dateIndex].times.splice(timeIndex, 1);
        setDates(newDates);
    };

    const handleConfirmSave = async () => {
        if (!selectedMovie.movieId || dates.length === 0 || dates.some(dateItem => dateItem.times.length === 0)) {
            setError("Vui lòng nhập đầy đủ thông tin phim, ngày và giờ chiếu trước khi lưu.");
            return;
        }

        const formattedDate = dates.map((dateItem) => {
            const formattedDate = dateItem.date.split("/").reverse().join("-");
            const times = dateItem.times.map((timeItem) => {
                const dateTimeString = `${formattedDate}T${timeItem.time}`;
                return {
                    timeStart: dateTimeString,
                    roomId: timeItem.room ? timeItem.room.id : "Chưa chọn",
                };
            });
            return {
                movieId: selectedMovie.movieId,
                timeSheet: times,
            };
        })[0];

        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8080/showtimes/admin/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedDate),
            });
            const data = await response.json();
            console.log("Response:", data);
            if (data.message) {
                window.location.href = 'showtime';
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };
    const handleSelectMovie = (movieTitle, movieId, duration) => {
        setSelectedMovie({
            movieId: movieId,
            movieName: movieTitle,
            duration: duration,
        });
        setShowSearchResults(false);
    };
    return (
        <div style={{textAlign:'center'}}>
            {isLoading && <LoadingComponent />}
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
                                        onClick={() => handleSelectMovie(result.title, result.id, result.duration)}
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
                    <div className={styles.dates_list}>
                        {dates.map((item, dateIndex) => (
                            <div key={dateIndex} className={styles.date_block}>
                                <div className={styles.date_header}>
                                    <span>Ngày: {data}</span>
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
                                                    {room.name}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                            </div>
                        ))}
                    </div>

                </div>
            )}
            {error && <div className={styles.error_message} style={{marginBottom:'20px'}}>{error}</div>}
            <div
                style={{
                    display: "flex",
                    textAlign: "center",
                    alignItems: "center",
                    margin: "0 35% 0 40%",
                }}
            >
                <div
                    onClick={Back}
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
