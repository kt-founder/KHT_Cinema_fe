import React, { useState } from 'react';

function PaymentSuccess() {
    return (
        <div>
            <h1 style={{color:'black'}}>Thanh toán thành công!</h1>
            <button onClick={() => window.location.href = "/"}>Quay về trang chủ</button>
        </div>
    );
}
export default PaymentSuccess