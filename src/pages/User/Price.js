import React from "react";
import Navbar from "../../components/Navbar";

const Price = () => {
    return (
        <div style={styles.pricePage}>
            {/* Navbar */}
            <Navbar />

            {/* Header */}
            <h1 style={styles.priceHeader}>Giá vé tại KHTCinema</h1>

            {/* Description */}
            <p style={styles.description}>
                Chào mừng bạn đến với <strong>KHTCinema</strong> - Rạp chiếu phim hiện đại nhất với âm thanh sống động và không gian sang trọng. Chúng tôi mang đến trải nghiệm xem phim đẳng cấp cho mọi đối tượng khách hàng với giá vé phù hợp.
            </p>

            {/* Price Table */}
            <div style={styles.tableContainer}>
                <table style={styles.priceTable}>
                    <thead>
                    <tr>
                        <th style={styles.tableHeader}>Loại vé</th>
                        <th style={styles.tableHeader}>Giá vé</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td style={styles.tableData}>Vé Thường</td>
                        <td style={styles.tableData}>10,000đ</td>
                    </tr>
                    <tr>
                        <td style={styles.tableData}>Vé VIP</td>
                        <td style={styles.tableData}>20,000đ</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <p style={styles.footer}>
                Đặt vé ngay để tận hưởng những bộ phim đặc sắc với chất lượng dịch vụ hàng đầu tại <strong>KHTCinema</strong>!
            </p>
        </div>
    );
};

// Inline CSS Styles
const styles = {
    pricePage: {
        backgroundColor: "#0b0b0d",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        textAlign: "center",
        minHeight: "100vh",
    },
    priceHeader: {
        fontSize: "28px",
        marginBottom: "20px",
        color: "#f0f0f0",
    },
    description: {
        fontSize: "16px",
        color: "#cccccc",
        margin: "0 auto 20px",
        maxWidth: "600px",
        lineHeight: "1.5",
    },
    tableContainer: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px",
    },
    priceTable: {
        width: "80%",
        maxWidth: "600px",
        borderCollapse: "collapse",
        backgroundColor: "#1a1a1d",
        color: "#ffffff",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    },
    tableHeader: {
        padding: "10px",
        backgroundColor: "#333333",
        color: "#ffffff",
        fontSize: "18px",
        fontWeight: "bold",
    },
    tableData: {
        padding: "10px",
        textAlign: "center",
        borderBottom: "1px solid #444444",
    },
    footer: {
        fontSize: "16px",
        color: "#cccccc",
        marginTop: "20px",
    },
};

export default Price;
