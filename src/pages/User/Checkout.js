import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { Card } from "antd";
import styles from "../styles/Checkout.module.css";
import ChooseFoodComponent from "../../components/ChooseFoodComponent";
import LoadingComponent from "../../components/LoadingComponent";

const Checkout = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [totalPriceWithItems, setTotalPriceWithItems] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const handleAddItems = (items) => {
        setSelectedItems((prev) => {
            const updatedItems = [...prev];
            items.forEach((newItem) => {
                const existingItem = updatedItems.find(
                    (item) => item.id === newItem.id && item.type === newItem.type
                );
                if (existingItem) {
                    existingItem.quantity += newItem.quantity;
                } else {
                    updatedItems.push(newItem);
                }
            });
            return updatedItems;
        });
    };

    const handleRemoveItem = (id, type) => {
        setSelectedItems((prev) =>
            prev.filter((item) => !(item.id === id && item.type === type))
        );
    };

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
            const snacks = selectedItems
                .filter((item) => !item.infoCombo) // Không có `infoCombo` là snack
                .map((snack) => ({ id: snack.id, quantity: snack.quantity }));

            const combos = selectedItems
                .filter((item) => item.infoCombo)
                .map((combo) => ({
                    id: combo.id,
                    quantity: combo.quantity,
                }));

            const requestData = {
                seatIds: selectedSeats.map((seat) => seat.seatId),
                showtimeId: showtimeId,
                userId: username,
                ...(snacks.length > 0 && { snack: snacks }),
                ...(combos.length > 0 && { combo: combos }),
            };

            console.log("Request Data:", requestData);
            fetchSchedule(requestData)
        }

    };
    useEffect(() => {
        const total = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalPriceWithItems(total);
    }, [selectedItems]);

    const fetchSchedule = async (data) => {
        setIsLoading(true)
        try {
            const url = `http://localhost:8080/payment/vn-pay?amount=${totalPrice + totalPriceWithItems}`;
            console.log("Request URL:", url);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
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
        } finally {
            setIsLoading(false)
        }
    };
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };
    return (
        <div>
            {isLoading && <LoadingComponent />}
        <div onClick={handleBack} style={{padding: '8px', backgroundColor: 'orange', cursor: 'pointer', width:'10%', textAlign:'center', marginTop:'20px'}}>
            <i className="fa fa-arrow-left" aria-hidden="true"></i><span style={{marginLeft:'10px'}}>Back</span>
        </div>
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
                    {selectedItems.length > 0 && (
                        <div>
                            <h3>Danh sách Snack/Combo đã chọn</h3>
                            <ul>
                                {selectedItems.map((item, index) => (
                                    <li key={`${item.type}-${index}`} style={{display: 'flex', padding: '8px'}}>
                                        * {item.name} - Số lượng:{" "} {item.quantity}
                                        <div
                                            style={{
                                                marginLeft: '10px',
                                                backgroundColor: 'red',
                                                color: 'white',
                                                padding: '0 8px',
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => handleRemoveItem(item.id, item.type)}
                                        >
                                            X
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <p>
                        <strong>Tổng tiền (ghế + snack/combo):</strong>{" "}
                        {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        })
                            .format(totalPrice + totalPriceWithItems)
                            .replace("₫", "VNĐ")}
                    </p>
                </Card>
                <ChooseFoodComponent onAddItems={handleAddItems}/>
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
                        <img src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="Momo" />
                        Thanh toán qua Momo
                    </div>
                    <div
                        className={`${styles.paymentOption} ${
                            paymentMethod === "VNPay" ? styles.selected : ""
                        }`}
                        onClick={() => setPaymentMethod("VNPay")}
                    >
                        <img src="https://inkythuatso.com/uploads/images/2021/12/vnpay-logo-inkythuatso-01-13-16-26-42.jpg" alt="VNPay" />
                        Thanh toán qua VNPay
                    </div>
                    <div
                        className={`${styles.paymentOption} ${
                            paymentMethod === "Bank" ? styles.selected : ""
                        }`}
                        onClick={() => setPaymentMethod("Bank")}
                    >
                        <img src="https://www.shutterstock.com/image-illustration/set-credit-cards-jpg-600nw-35623036.jpg" alt="Bank" />
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
        </div>
    );
};

export default Checkout;
