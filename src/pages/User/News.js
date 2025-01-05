import React from "react";
import Navbar from "../../components/Navbar";

const newsData = [
    {
        title: "Chương trình chiếu phim miễn phí ngày cuối tuần",
        date: "10/12/2024",
        image: "https://via.placeholder.com/300x150",
        description:
            "Rạp chiếu phim Quốc gia mang đến chương trình chiếu phim miễn phí vào cuối tuần, áp dụng cho các bộ phim kinh điển.",
    },
    {
        title: "Khuyến mãi bắp nước đặc biệt tháng 12",
        date: "05/12/2024",
        image: "https://via.placeholder.com/300x150",
        description:
            "Mua 1 vé xem phim bất kỳ, nhận ngay combo bắp nước chỉ 49,000 VNĐ.",
    },
    {
        title: "Lễ hội phim Tết 2025 - Những bộ phim đặc sắc",
        date: "01/12/2024",
        image: "https://via.placeholder.com/300x150",
        description:
            "Hòa cùng không khí Tết, rạp chiếu phim tổ chức lễ hội phim Tết với nhiều suất chiếu đặc biệt.",
    },
    {
        title: "Chương trình ưu đãi thành viên thân thiết",
        date: "28/11/2024",
        image: "https://via.placeholder.com/300x150",
        description:
            "Thành viên thân thiết của rạp được nhận ưu đãi giảm giá 20% trên toàn bộ vé và combo.",
    },
    {
        title: "Sự kiện chiếu phim dành cho thiếu nhi",
        date: "25/11/2024",
        image: "https://via.placeholder.com/300x150",
        description:
            "Những bộ phim hoạt hình được yêu thích nhất sẽ được chiếu vào mỗi sáng thứ 7, dành riêng cho các em nhỏ.",
    },
];

const New = () => {
    return (
        <div style={styles.newsPage}>
            {/* Navbar */}
            <Navbar />

            {/* Header */}
            <h1 style={styles.newsHeader}>Tin tức Rạp chiếu phim</h1>

            {/* News List */}
            <div style={styles.newsContainer}>
                {newsData.map((news, index) => (
                    <div style={styles.newsCard} key={index}>
                        <img src={news.image} alt={news.title} style={styles.newsImage} />
                        <div style={styles.newsContent}>
                            <p style={styles.newsDate}>{news.date}</p>
                            <h3 style={styles.newsTitle}>{news.title}</h3>
                            <p style={styles.newsDescription}>{news.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Inline CSS Styles
const styles = {
    newsPage: {
        backgroundColor: "#0b0b0d",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        textAlign: "center",
        minHeight: "100vh",
    },
    newsHeader: {
        fontSize: "28px",
        marginBottom: "20px",
        color: "#f0f0f0",
    },
    newsContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "20px",
    },
    newsCard: {
        backgroundColor: "#1a1a1d",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    newsImage: {
        width: "100%",
        height: "150px",
        objectFit: "cover",
    },
    newsContent: {
        padding: "10px",
        textAlign: "left",
    },
    newsDate: {
        fontSize: "12px",
        color: "#aaaaaa",
    },
    newsTitle: {
        fontSize: "18px",
        fontWeight: "bold",
        margin: "5px 0",
    },
    newsDescription: {
        fontSize: "14px",
        color: "#cccccc",
        marginTop: "5px",
    },
};

export default New;
