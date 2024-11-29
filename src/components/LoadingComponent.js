import React from "react";
import styles from "./StylesComponent/LoadingComponent.module.css"; // Import CSS module

const LoadingComponent = () => {
    return (
        <div className={styles.loading_overlay}>
            <div className={styles.loading_spinner}></div>
            <p style={{marginLeft:'20px'}}>Đang xử lý, vui lòng chờ...</p>
        </div>
    );
};

export default LoadingComponent;