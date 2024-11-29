
import React, { useState } from "react";
import styles from "./StylesComponent/ComboCDialog.module.css";

const ComboCDialog = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [snacks, setSnacks] = useState([]);
    const [selectedSnacks, setSelectedSnacks] = useState([]);
    const [comboData, setComboData] = useState({
        name: "",
        price: "",
        img:"https://salt.tikicdn.com/cache/750x750/ts/product/65/56/40/917357f489e95a095c5657532b484aa2.jpg.webp"});
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const openDialog = () => setOpen(true);
    const closeDialog = () => {
        setComboData({
            name: "",
            price: "",
            img:""
        })
        setErrorMessage("")
        setSelectedSnacks([])
        setSearchTerm("")
        setSnacks([])
        setOpen(false)
    };

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:8080/snacks/search-snacks?keyword=${searchTerm}`);
            const result = await response.json();
            setSnacks(result.data); // Cập nhật danh sách snack tìm kiếm
        } catch (error) {
            console.error("Lỗi khi tìm kiếm snack:", error);
        }
    };

    const handleAddSnack = (snack) => {
        if (!selectedSnacks.find((s) => s.id === snack.id)) {
            setSelectedSnacks([...selectedSnacks, { ...snack, quantity: 1 }]);
        }
    };

    const handleQuantityChange = (id, change) => {
        setSelectedSnacks((prev) =>
            prev.map((snack) =>
                snack.id === id
                    ? { ...snack, quantity: Math.max(snack.quantity + change, 1) }
                    : snack
            )
        );
    };

    const handleComboChange = (e) => {
        const { name, value } = e.target;
        setComboData({ ...comboData, [name]: value });
    };


    const handleSubmit =async () => {
        setErrorMessage("");

        if (!comboData.name.trim() || !comboData.price.trim() || parseInt(comboData.price, 10) <= 0) {
            setErrorMessage("Vui lòng nhập đầy đủ thông tin Tên Combo và Giá Combo (Giá phải lớn hơn 0).");
            return;
        }

        if (selectedSnacks.length === 0) {
            setErrorMessage("Vui lòng chọn ít nhất một snack.");
            return;
        }

        if (selectedSnacks.length === 1 && selectedSnacks[0].quantity <= 1) {
            setErrorMessage(
                "Nếu Combo chỉ có 1 món snack, số lượng món snack đó phải lớn hơn 1. Vui lòng chỉnh sửa lại."
            );
            return;
        }
        try {
            const dataSend = {
                ...comboData,
                snacks: selectedSnacks.map(({ id, quantity }) => ({ id, quantity })),
            };
            console.log(dataSend)
            const response = await fetch(`http://localhost:8080/combo/create-combo`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataSend),
            });
            const result = await response.json();
            if (result.message === "Successful") {
                alert("Combo đã được lưu thành công!");
                closeDialog()
                window.location.reload();
            }
        } catch (error) {
            console.error("Lỗi khi lưu combo:", error);
            alert("Không thể lưu combo, vui lòng thử lại!");
        }
    };
    const handleRemoveSnack = (id) => {
        setSelectedSnacks((prev) => prev.filter((snack) => snack.id !== id));
    };
    return (
        <div>
            <button className={styles.primary_button} onClick={openDialog}>
                Thêm Combo
            </button>
            {open && (
                <div className={styles.dialog_container}>
                    <div className={styles.dialog}>
                        <h2 className={styles.title}>Thông tin Combo</h2>
                        <div className={styles.combo_info}>
                            <label>
                                Tên Combo:
                                <input
                                    style={{marginLeft:'20px'}}
                                    type="text"
                                    name="name"
                                    value={comboData.name}
                                    onChange={handleComboChange}
                                    placeholder="Nhập tên combo"
                                    className={styles.input_field}
                                />
                            </label>
                            <label>
                                Giá Combo:
                                <input
                                    style={{marginLeft:'20px'}}
                                    type="number"
                                    name="price"
                                    value={comboData.price}
                                    onChange={handleComboChange}
                                    placeholder="Nhập giá combo ( VNĐ )"
                                    className={styles.input_field}
                                />
                            </label>
                        </div>
                        {/* Thông báo lỗi */}
                        {errorMessage && <p className={styles.error_message}>{errorMessage}</p>}

                        <h3 className={styles.subtitle}>Tìm kiếm Snack</h3>
                        {/* ... */}
                        <div className={styles.search_section}>
                            <input
                                style={{marginBottom:'0px'}}
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Nhập thông tin tìm kiếm..."
                                className={styles.input_field}
                            />
                            <div onClick={handleSearch} className={styles.add_button}>
                                Tìm kiếm
                            </div>
                        </div>

                        <div className={styles.snack_results}>
                            {snacks.map((snack) => (
                                <div key={snack.id} className={styles.snack_item}>
                                    <span>
                                        {snack.name} - {snack.price.toLocaleString()} VNĐ
                                    </span>
                                    <div
                                        onClick={() => handleAddSnack(snack)}
                                        className={styles.add_button}
                                    >
                                        Chọn
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h3 className={styles.subtitle}>Danh sách Snack đã chọn</h3>
                        <div className={styles.selected_snacks}>
                            {selectedSnacks.map((snack) => (
                                <div key={snack.id} className={styles.selected_snack_item}>
                                    <div
                                        className={styles.delete_button}
                                        onClick={() => handleRemoveSnack(snack.id)}
                                    >
                                        Xóa
                                    </div>
                                    <span>{snack.name}</span>
                                    <span>{snack.price.toLocaleString()} VNĐ / 1</span>
                                    <div className={styles.quantity_controls}>
                                        <div
                                            className={styles.quantity_button}
                                            onClick={() => handleQuantityChange(snack.id, -1)}
                                        >
                                            -
                                        </div>
                                        <input
                                            style={{marginBottom: '0px'}}
                                            type="number"
                                            min="1"
                                            value={snack.quantity}
                                            readOnly
                                            className={styles.quantity_input}
                                        />
                                        <div
                                            className={styles.quantity_button}
                                            onClick={() => handleQuantityChange(snack.id, 1)}
                                        >
                                            +
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.dialog_actions}>
                            <button onClick={handleSubmit} className={styles.primary_button}>
                                Lưu
                            </button>
                            <button onClick={closeDialog} className={styles.secondary_button}>
                                Quay lại
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ComboCDialog;


