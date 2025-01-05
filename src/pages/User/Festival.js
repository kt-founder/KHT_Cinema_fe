import React from "react";
import Navbar from "../../components/Navbar";

const Festival = () => {
    return (
        <div style={styles.festivalPage}>
            {/* Navbar */}
            <Navbar />

            {/* Header */}
            <h1 style={styles.header}>Liên Hoan Phim tại KHTCinema</h1>

            {/* Content */}
            <div style={styles.content}>
                <p>
                    Chào mừng bạn đến với <strong>Liên Hoan Phim Quốc Tế</strong> tại KHTCinema! Đây là sự kiện thường niên thu hút hàng trăm bộ phim xuất sắc từ khắp nơi trên thế giới.
                </p>
                <p>
                    Với chủ đề năm nay là <em>"Khám phá thế giới qua màn ảnh rộng"</em>, chúng tôi sẽ trình chiếu hơn 50 bộ phim đến từ các nền điện ảnh hàng đầu, bao gồm Hollywood, Hàn Quốc, Nhật Bản, Châu Âu và nhiều quốc gia khác.
                </p>
                <p>
                    <strong>Các hoạt động chính tại liên hoan phim:</strong>
                </p>
                <ul style={styles.list}>
                    <li>Trình chiếu các bộ phim đoạt giải thưởng lớn.</li>
                    <li>Gặp gỡ và giao lưu với các đạo diễn, diễn viên nổi tiếng.</li>
                    <li>Thảo luận chuyên đề về nghệ thuật điện ảnh.</li>
                    <li>Tham gia các buổi workshop và trải nghiệm làm phim.</li>
                </ul>
                <p>
                    Hãy đến và trở thành một phần của <strong>Liên Hoan Phim Quốc Tế</strong>, nơi mà tình yêu điện ảnh được tôn vinh và lan tỏa!
                </p>
                <p>
                    Đừng quên theo dõi lịch chiếu và đặt vé trước để có được những chỗ ngồi tốt nhất!
                </p>
                <p style={styles.signature}>
                    <strong>KHTCinema - Trải nghiệm điện ảnh đỉnh cao!</strong>
                </p>
            </div>
        </div>
    );
};

// Inline CSS Styles
const styles = {
    festivalPage: {
        backgroundColor: "#0b0b0d",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        textAlign: "center",
        minHeight: "100vh",
    },
    header: {
        fontSize: "28px",
        marginBottom: "20px",
        color: "#f0f0f0",
    },
    content: {
        fontSize: "16px",
        color: "#cccccc",
        margin: "0 auto",
        maxWidth: "800px",
        lineHeight: "1.8",
        textAlign: "left",
    },
    list: {
        paddingLeft: "20px",
        marginBottom: "20px",
    },
    signature: {
        fontSize: "18px",
        color: "#ffffff",
        marginTop: "30px",
        textAlign: "center",
    },
};

export default Festival;
