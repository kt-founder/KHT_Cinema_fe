import React from "react";
import { useLocation } from "react-router-dom";
import { Card } from "antd";
import styles from "../styles/Checkout.module.css";

const Checkout = () => {
    const { state } = useLocation();
    const { selectedSeats, totalPrice, showtimeId,username,roomName,roomId,startTime,endTime,date, movie } = state || {};
    const [paymentMethod, setPaymentMethod] = React.useState("");

    const handlePayment = () => {
        if (!paymentMethod) {
            alert("Vui lòng chọn phương thức thanh toán");
            return;
        }
        if (paymentMethod === 'Momo' || paymentMethod === 'Bank'){
            alert('Chức năng đang được triển khai !')
        } else {
            const data = {
                showtimeId: showtimeId,
                userId: username,
                seatIds: selectedSeats.map(item => item.seatId)
            }
            console.log({data})
            fetchSchedule(data)
        }

    };
    const fetchSchedule = async (data) => {
        try {
            const url = `http://localhost:8080/payment/vn-pay?amount=${totalPrice}`;
            console.log("Request URL:", url);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Gửi trực tiếp object `data`
            });

            const result = await response.json();
            console.log("Response data:", result.data);

            if (result && result.data) {
                window.location.href = result.data;
            } else {
                console.error("Err1:", result.message);
                alert("Vé bạn chọn đã được đặt !")
                window.location.href = '/payment-failure'
            }
        } catch (error) {
            console.error("Err2:", error);
            window.location.href = '/payment-failure'
        }
    };

    return (
        <div className={styles.checkoutContainer}>
            <div className={styles.checkoutInfo}>
                <h2>Thông tin hóa đơn</h2>
                <Card>
                    <p>
                        <strong>Khách hàng:</strong> {username}
                    </p>
                    <p>
                        <strong>
                            Ngày chiếu: {date}
                        </strong>
                    </p>
                    <p>
                        <strong>Phim : {movie}</strong> - <strong>Phòng: {roomName}</strong>
                    </p>
                    <p>
                        <strong>Start : {startTime}</strong>
                        -
                        <strong>End: {endTime}</strong>
                    </p>
                    <p>
                        <strong>Ghế đã chọn:</strong>{" "}
                        {selectedSeats.map((seat) => seat.seatNumber).join(", ")}
                    </p>
                    <p>
                        <strong>Tổng tiền:</strong> {totalPrice.toLocaleString("vi-VN")} đ
                    </p>
                </Card>
            </div>

            {/* Phương thức thanh toán */}
            <div className={styles.checkoutPayment}>
                <h2>Phương thức thanh toán</h2>
                <div className={styles.paymentMethods}>
                    <div
                        className={`${styles.paymentOption} ${
                            paymentMethod === "Momo" ? styles.selected : ""
                        }`}
                        onClick={() => setPaymentMethod("Momo")}
                    >
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiv9KuDlewSDAsGpvHQDuPQ78hNQ_01h9nMA&s" alt="Momo" />
                        Thanh toán qua Momo
                    </div>
                    <div
                        className={`${styles.paymentOption} ${
                            paymentMethod === "VNPay" ? styles.selected : ""
                        }`}
                        onClick={() => setPaymentMethod("VNPay")}
                    >
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiv9KuDlewSDAsGpvHQDuPQ78hNQ_01h9nMA&s" alt="VNPay" />
                        Thanh toán qua VNPay
                    </div>
                    <div
                        className={`${styles.paymentOption} ${
                            paymentMethod === "Bank" ? styles.selected : ""
                        }`}
                        onClick={() => setPaymentMethod("Bank")}
                    >
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiv9KuDlewSDAsGpvHQDuPQ78hNQ_01h9nMA&s" alt="Bank" />
                        Thanh toán qua Thẻ ngân hàng
                    </div>
                </div>

                <button
                    className={styles.checkoutButton}
                    onClick={handlePayment}
                >
                    Xác nhận thanh toán
                </button>
            </div>
        </div>
    );
};

export default Checkout;
