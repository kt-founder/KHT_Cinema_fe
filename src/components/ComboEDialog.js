
import React, { useState } from "react";
import styles from "./StylesComponent/ComboCDialog.module.css";

const ComboEDialog = ({ combo }) => {
    const [comboData, setComboData] = useState({
        id: combo.id || "",
        name: combo.name || "",
        img: combo.img || "",
        price: combo.price.toString() || "",
        snacks: combo.infoCombo.map((snack) => ({
            id: snack.idSnack,
            name: snack.nameSnack,
            quantity: snack.quantity,
        })) || [],
    });

    const [open, setOpen] = useState(false);

    const openDialog = () => setOpen(true);

    const closeDialog = () => {
        setComboData({
            id: combo.id || "",
            name: combo.name || "",
            img: combo.img || "",
            price: combo.price || "",
            snacks: combo.infoCombo.map((snack) => ({
                id: snack.idSnack,
                name: snack.nameSnack,
                quantity: snack.quantity,
            })) || [],
        });
        setOpen(false);
    };

    const handleComboChange = (e) => {
        const { name, value } = e.target;
        setComboData({ ...comboData, [name]: value });
    };

    const handleQuantityChange = (id, change) => {
        setComboData((prev) => ({
            ...prev,
            snacks: prev.snacks.map((snack) =>
                snack.id === id
                    ? { ...snack, quantity: Math.max(snack.quantity + change, 1) }
                    : snack
            ),
        }));
    };

    const handleSave =async () => {
        if (!comboData.name.trim() || !comboData.price.trim() || parseInt(comboData.price, 10) <= 0) {
            alert("Vui lòng nhập đầy đủ thông tin Tên Combo và Giá Combo (Giá phải lớn hơn 0).");
            return;
        }

        if (comboData.snacks.length === 0) {
            alert("Vui lòng thêm ít nhất một snack vào combo.");
            return;
        }

        try {
            const payload = {
                id: comboData.id,
                name: comboData.name,
                img: comboData.img,
                price: parseInt(comboData.price, 10),
                snacks: comboData.snacks.map(({ id, quantity }) => ({ id, quantity })),
            };

            const response = await fetch(`http://localhost:8080/combo/edit-combo`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
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

    return (
        <div>
            <button className="edit-button" style={{background: "#3498db"}} onClick={openDialog}>
                <i className="fa-solid fa-pen-to-square"></i>
            </button>

            {open && (
                <div className={styles.dialog_container}>
                    <div className={styles.dialog}>
                        <h2 className={styles.title}>Chỉnh sửa Combo</h2>
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
                                    placeholder="Nhập giá combo (VNĐ)"
                                    className={styles.input_field}
                                />
                            </label>
                        </div>

                        <h3 className={styles.subtitle}>Danh sách Snack</h3>
                        <div className={styles.selected_snacks}>
                            {comboData.snacks.map((snack) => (
                                <div key={snack.id} className={styles.selected_snack_item}>
                                    <span>{snack.name}</span>
                                    <div className={styles.quantity_controls}>
                                        <button
                                            className={styles.quantity_button}
                                            onClick={() => handleQuantityChange(snack.id, -1)}
                                        >
                                            -
                                        </button>
                                        <input
                                            style={{marginBottom:'0px'}}
                                            type="number"
                                            min="1"
                                            value={snack.quantity}
                                            readOnly
                                            className={styles.quantity_input}
                                        />
                                        <button
                                            className={styles.quantity_button}
                                            onClick={() => handleQuantityChange(snack.id, 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.dialog_actions}>
                            <button onClick={handleSave} className={styles.primary_button}>
                                Lưu
                            </button>
                            <button onClick={closeDialog} className={styles.secondary_button}>
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ComboEDialog;

