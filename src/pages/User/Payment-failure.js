import React, { useState } from 'react';

function PaymentFailure() {
    return (
        <div  style={{textAlign:'center'}}>
            <h1 style={{color:'black'}}>Thanh toán thất bại</h1>
            <button onClick={() => window.location.href = "/"}>Thử lại</button>
        </div>
    );
}
export default PaymentFailure