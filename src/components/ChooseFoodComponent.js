import React, {useEffect, useState} from 'react';
import styles from "./StylesComponent/ChooseFoodComponent.module.css";
import {Spin} from "antd"; // Import CSS Module


const ChooseFoodComponent = ({ onAddItems }) => {
    const [open, setOpen] = useState(false);
    const [snacks, setSnacks] = useState([]);
    const [combos, setCombos] = useState([]);

    const openDialog = () => setOpen(true);
    const closeDialog = () => {
        // Reset số lượng khi đóng dialog
        setSnacks((prev) => prev.map((item) => ({ ...item, quantity: 0 })));
        setCombos((prev) => prev.map((item) => ({ ...item, quantity: 0 })));
        setOpen(false);
    };

    const fetchDataSnacks = async () => {
        try {
            const response = await fetch("http://localhost:8080/combo/get-combo-and-snack");
            const result = await response.json();
            setSnacks(result.data.snack.map((item) => ({ ...item, quantity: 0 })));
            setCombos(result.data.combo.map((item) => ({ ...item, quantity: 0 })));
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchDataSnacks();
    }, []);

    const handleQuantityChange = (id, type, change) => {
        if (type === "snack") {
            setSnacks((prev) =>
                prev.map((snack) =>
                    snack.id === id
                        ? { ...snack, quantity: Math.max(snack.quantity + change, 0) }
                        : snack
                )
            );
        } else if (type === "combo") {
            setCombos((prev) =>
                prev.map((combo) =>
                    combo.id === id
                        ? { ...combo, quantity: Math.max(combo.quantity + change, 0) }
                        : combo
                )
            );
        }
    };

    const handleAddToCheckout = () => {
        const selectedSnacks = snacks.filter((item) => item.quantity > 0);
        const selectedCombos = combos.filter((item) => item.quantity > 0);

        const selectedItems = [...selectedSnacks, ...selectedCombos];

        // Gửi các món được chọn về Checkout và reset số lượng
        onAddItems(selectedItems);
        closeDialog();
    };

    return (
        <div>
            <button className={styles.edit_button} onClick={openDialog}>
                <i className="fa fa-burger"></i> Chọn Snack / Combo
            </button>

            {open && (
                <div className={styles.dialog_container}>
                    <div className={styles.dialog}>
                        <h2 className={styles.dialog_title}>Chọn Snack và Combo</h2>
                        <div className={styles.dialog_content}>
                            {/* Danh sách Snack */}
                            <div className={styles.section}>
                                <h3 className={styles.section_title}>Danh sách Snack</h3>
                                <table className={styles.table}>
                                    <thead>
                                    <tr>
                                        <th style={{textAlign:'center'}}>Tên</th>
                                        <th style={{textAlign:'center'}}>Giá</th>
                                        <th style={{textAlign:'center'}}>Số lượng</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {snacks.map((s) => (
                                        <tr key={s.id}>
                                            <td style={{display:'flex', alignItems:'center'}}>
                                                <img className={styles.image} alt="Snack" src={s.img} />
                                                <span style={{marginLeft:'10px'}}>{s.name}</span>
                                            </td>
                                            <td style={{textAlign:'center'}}>
                                                {new Intl.NumberFormat("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                })
                                                    .format(s.price)
                                                    .replace("₫", "VNĐ")}
                                            </td>
                                            <td>
                                                <div className={styles.quantity_controls}>
                                                    <button
                                                        className={styles.quantity_button}
                                                        onClick={() => handleQuantityChange(s.id, "snack", -1)}
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="number"
                                                        value={s.quantity}
                                                        readOnly
                                                        className={styles.quantity_input}
                                                    />
                                                    <button
                                                        className={styles.quantity_button}
                                                        onClick={() => handleQuantityChange(s.id, "snack", 1)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Danh sách Combo */}
                            <div className={styles.section}>
                                <h3 className={styles.section_title}>Danh sách Combo</h3>
                                <table className={styles.table}>
                                    <thead>
                                    <tr>
                                        <th style={{textAlign:'center'}}>Tên</th>
                                        <th style={{textAlign:'center'}}>Giá</th>
                                        <th style={{textAlign:'center'}}>Số lượng</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {combos.map((c) => (
                                        <tr key={c.id}>
                                            <td style={{display:'flex', alignItems:'center'}}>
                                                {c.name}
                                                <img style={{marginLeft:'10px'}} className={styles.image} alt="Combo" src={c.img} />
                                                <div style={{marginLeft:'10px'}}>
                                                    {c.infoCombo.map((i) => (
                                                        <div key={i.idSnack} style={{marginBottom:'2px'}}>
                                                            {i.quantity} {i.nameSnack}
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                            <td style={{textAlign:'center'}}>
                                                {new Intl.NumberFormat("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                })
                                                    .format(c.price)
                                                    .replace("₫", "VNĐ")}
                                            </td>
                                            <td>
                                                <div className={styles.quantity_controls}>
                                                    <button
                                                        className={styles.quantity_button}
                                                        onClick={() => handleQuantityChange(c.id, "combo", -1)}
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="number"
                                                        value={c.quantity}
                                                        readOnly
                                                        className={styles.quantity_input}
                                                    />
                                                    <button
                                                        className={styles.quantity_button}
                                                        onClick={() => handleQuantityChange(c.id, "combo", 1)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className={styles.dialog_actions}>
                            <button className={styles.primary_button} onClick={handleAddToCheckout}>
                                Thêm vào hóa đơn
                            </button>
                            <button className={styles.secondary_button} onClick={closeDialog}>
                                Thoát
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChooseFoodComponent;



