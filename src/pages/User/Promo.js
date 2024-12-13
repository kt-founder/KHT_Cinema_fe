import React from "react";
import Navbar from "../../components/Navbar";

const promoData = [
    {
        title: "Mua vé 2D, tặng ngay combo bắp nước",
        date: "10/12/2024",
        image: "https://via.placeholder.com/300x150",
        description:
            "Áp dụng từ 10/12/2024, khi mua vé xem phim 2D tại rạp, nhận ngay combo bắp nước miễn phí.",
    },
    {
        title: "Giảm 30% cho thành viên VIP",
        date: "05/12/2024",
        image: "https://via.placeholder.com/300x150",
        description:
            "Thành viên VIP của rạp được giảm giá 30% cho tất cả vé xem phim trong tháng 12.",
    },
    {
        title: "Tặng vé xem phim khi mua combo gia đình",
        date: "01/12/2024",
        image: "https://via.placeholder.com/300x150",
        description:
            "Khi mua combo gia đình (4 người trở lên), bạn sẽ được tặng ngay 1 vé xem phim miễn phí.",
    },
    {
        title: "Khuyến mãi Ngày Lễ Giáng Sinh",
        date: "25/12/2024",
        image: "https://via.placeholder.com/300x150",
        description:
            "Trong ngày 24 và 25/12, nhận ưu đãi giảm 50% vé xem phim cho tất cả các suất chiếu.",
    },
    {
        title: "Ưu đãi combo bắp nước chỉ 59,000 VNĐ",
        date: "20/12/2024",
        image: "https://via.placeholder.com/300x150",
        description:
            "Nhận ngay combo bắp nước với giá chỉ 59,000 VNĐ khi mua vé vào ngày thứ 6 hàng tuần.",
    },
];

const Promo = () => {
    return (
        <div style={styles.promoPage}>
            {/* Navbar */}
            <Navbar />

            {/* Header */}
            <h1 style={styles.promoHeader}>Khuyến mãi</h1>

            {/* Promo List */}
            <div style={styles.promoContainer}>
                {promoData.map((promo, index) => (
                    <div style={styles.promoCard} key={index}>
                        <img src={promo.image} alt={promo.title} style={styles.promoImage} />
                        <div style={styles.promoContent}>
                            <p style={styles.promoDate}>{promo.date}</p>
                            <h3 style={styles.promoTitle}>{promo.title}</h3>
                            <p style={styles.promoDescription}>{promo.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Inline CSS Styles
const styles = {
    promoPage: {
        backgroundColor: "#0b0b0d",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        textAlign: "center",
        minHeight: "100vh",
    },
    promoHeader: {
        fontSize: "28px",
        marginBottom: "20px",
        color: "#f0f0f0",
    },
    promoContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "20px",
    },
    promoCard: {
        backgroundColor: "#1a1a1d",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    promoImage: {
        width: "100%",
        height: "150px",
        objectFit: "cover",
    },
    promoContent: {
        padding: "10px",
        textAlign: "left",
    },
    promoDate: {
        fontSize: "12px",
        color: "#aaaaaa",
    },
    promoTitle: {
        fontSize: "18px",
        fontWeight: "bold",
        margin: "5px 0",
    },
    promoDescription: {
        fontSize: "14px",
        color: "#cccccc",
        marginTop: "5px",
    },
};

export default Promo;
