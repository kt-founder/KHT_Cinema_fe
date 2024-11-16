

function PaymentFailure() {
    return (
        <div>
            <h1>Thanh toán thất bại</h1>
            <button onClick={() => window.location.href = "/"}>Thử lại</button>
        </div>
    );
}
export default PaymentFailure