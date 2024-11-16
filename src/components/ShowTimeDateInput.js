import React, { useState } from 'react';
import styles from "./StylesComponent/ShowTimeDateInput.module.css";
import {useNavigate} from "react-router-dom";

const ShowTimeDateInput = () => {
    const today = new Date();
    const [isDisabled, setIsDisabled] = useState(true);
    const [dayInput, setDayInput] = useState("");
    const [monthInput, setMonthInput] = useState(today.getMonth() + 1);
    const [yearInput, setYearInput] = useState(today.getFullYear());
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");

    const openDialog = () => {
        setDayInput("")
        setError("")
        setOpen(true);
    };
    const closeDialog = () => {
        setOpen(false);
    };
    const isValidDate = (day, month, year) => {
        const dayInt = parseInt(day, 10);
        const monthInt = parseInt(month, 10);
        const yearInt = parseInt(year, 10);
        console.log(today.getDate())
        if (day === '' || month === '' || year === ''){
            return false;
        }
        if (dayInt < today.getDate()){
            return false;
        }
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
    const handleAddDate = () => {
        if (!isValidDate(dayInput, monthInput, yearInput)) {
            setError("Ngày không hợp lệ. Vui lòng kiểm tra lại.");
            return;
        }
        setError("")
        const formattedDate = `${dayInput.padStart(2, "0")}/${monthInput < 10 ? '0' + monthInput : monthInput}/${yearInput}`;
        console.log(formattedDate)
        handleSubmit(formattedDate)
    };

    const navigate = useNavigate();
    const handleSubmit = (data) => {
        if (data) {
            navigate('/admin/create-show-time', { state: data,replace:true });
        } else {
            console.error("Data is empty or undefined");
        }
    };
    return (
        <div >
            <div style={{margin:'20px', padding: '8px 12px', border: '1px solid #d3c8c8',backgroundColor: '#dfd9d9',cursor: 'pointer'}}
                 onClick={openDialog}>Thêm suất chiếu</div>
            {open && (
                <div className={styles.dialog_container}>
                    <div className={styles.dialog}>
                        <h1 style={{marginBottom:'20px'}}>Nhập ngày của suất chiếu</h1>
                        <div className={styles.dialog_content}>
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
                                    disabled={true}
                                    style={{
                                        backgroundColor: isDisabled ? '#f0f0f0' : '#fff',
                                        color: isDisabled ? '#999' : '#000',
                                        borderColor: isDisabled ? '#ccc' : '#000',
                                        cursor: isDisabled ? 'not-allowed' : 'text'
                                    }}
                                />
                                <input
                                    type="text"
                                    placeholder="Năm"
                                    value={yearInput}
                                    onChange={(e) => setYearInput(e.target.value)}
                                    className={styles.date_input}
                                    disabled={true}
                                    style={{
                                        backgroundColor: isDisabled ? '#f0f0f0' : '#fff',
                                        color: isDisabled ? '#999' : '#000',
                                        borderColor: isDisabled ? '#ccc' : '#000',
                                        cursor: isDisabled ? 'not-allowed' : 'text'
                                    }}
                                />
                            </div>
                            {error && <p>{error}</p>}
                        </div>
                        <div className={styles.movie_actions}>
                            <div className={styles.movie_actions_button} onClick={closeDialog}>Thoát</div>
                            <div className={styles.movie_actions_button} onClick={handleAddDate}>Thêm</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowTimeDateInput;
