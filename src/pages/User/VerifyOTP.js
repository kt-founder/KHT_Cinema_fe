import React, { useState } from 'react';
import styles from '../styles/OtpVerification.module.css'; // Import CSS Module

const VerifyOtp = () => {
    const [otp, setOtp] = useState(new Array(5).fill(""));

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        // Focus on the next input
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const handleSubmit = () => {
        // Submit OTP logic here
        console.log("Entered OTP is:", otp.join(""));
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className={styles.otp_verification_container}>
                    <h2>XÁC THỰC</h2>
                    <p>Nhập mã OTP đã gửi qua email:</p>
                    <p>abcd@gmail.com</p>
                    <div className={styles.otp_inputs}>
                        {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                value={data}
                                onChange={(e) => handleChange(e.target, index)}
                                onFocus={(e) => e.target.select()}
                            />
                        ))}
                    </div>

                    <button className={styles.verify_button} onClick={handleSubmit}>
                        XÁC NHẬN
                    </button>

                    <div className={styles.footer}>
                        <span style={{marginRight:'10px'}}>Bạn chưa nhận được mã OTP?</span>
                        <a onClick={null} style={{cursor:'pointer'}}>Gửi lại mã</a>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default VerifyOtp;
