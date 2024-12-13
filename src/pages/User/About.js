import React from "react";
import Navbar from "../../components/Navbar";

const About = () => {
    return (
        <div style={styles.aboutPage}>
            {/* Navbar */}
            <Navbar />

            {/* Header */}
            <h1 style={styles.header}>Giới thiệu về KHTCinema</h1>

            {/* About Content */}
            <div style={styles.content}>
                <p>
                    <strong>KHTCinema</strong> là hệ thống rạp chiếu phim hiện đại, được thiết kế và vận hành bởi đội ngũ đam mê điện ảnh, dẫn đầu bởi <strong>Khánh Tùng Hiếu</strong>. Với mục tiêu mang lại những trải nghiệm giải trí tốt nhất, chúng tôi không ngừng đổi mới và nâng cấp chất lượng dịch vụ.
                </p>
                <p>
                    <strong>Tầm nhìn:</strong> Trở thành điểm đến giải trí hàng đầu, nơi gắn kết cộng đồng yêu thích điện ảnh và văn hóa.
                </p>
                <p>
                    <strong>Sứ mệnh:</strong> Mang đến những trải nghiệm xem phim đẳng cấp, với hệ thống âm thanh và hình ảnh tiên tiến, đồng thời hỗ trợ phát triển nghệ thuật điện ảnh tại Việt Nam.
                </p>

                {/* Contact Information */}
                <h2 style={styles.subHeader}>Thông tin liên hệ</h2>
                <ul style={styles.contactList}>
                    <li>
                        <strong>Địa chỉ:</strong> 10 Nguyễn Trãi, Hà Đông, Hà Nội
                    </li>
                    <li>
                        <strong>Email:</strong> support@khtcinema.com
                    </li>
                    <li>
                        <strong>Số điện thoại:</strong> 0123 456 789
                    </li>
                    <li>
                        <strong>Website:</strong> <a href="https://www.khtcinema.com" style={styles.link}>www.khtcinema.com</a>
                    </li>
                </ul>

                {/* Footer */}
                <p style={styles.footer}>
                    Hãy đến với <strong>KHTCinema</strong> để cùng trải nghiệm những bộ phim tuyệt vời và dịch vụ tốt nhất!
                </p>
            </div>
        </div>
    );
};

// Inline CSS Styles
const styles = {
    aboutPage: {
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
    subHeader: {
        fontSize: "22px",
        margin: "20px 0",
        color: "#ffffff",
    },
    contactList: {
        paddingLeft: "20px",
        marginBottom: "20px",
    },
    link: {
        color: "#1e90ff",
        textDecoration: "none",
    },
    footer: {
        fontSize: "18px",
        color: "#ffffff",
        marginTop: "30px",
        textAlign: "center",
    },
};

export default About;
