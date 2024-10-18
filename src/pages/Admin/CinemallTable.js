import React, { useState, useEffect } from "react";
import CinemaService from '../../Confligs/Api'; // Đường dẫn tới CinemaService.js
import './CinemallTable.css'; // Import file CSS

const CinemaTable = () => {
    const [cinemas, setCinemas] = useState([]);

    // Lấy danh sách cinema halls từ API thông qua service
    useEffect(() => {
        CinemaService.GetAllCinemaHall()
            .then((response) => {
                const data = response.data.data; // Trỏ đến trường "data" bên trong object trả về
                console.log(data);
                if (Array.isArray(data)) {
                    // Sắp xếp theo `id`
                    const sortedData = data.sort((a, b) => a.id - b.id);
                    setCinemas(sortedData); // Đảm bảo data là mảng và đã sắp xếp
                } else {
                    console.error("Expected an array but got: ", typeof data);
                    setCinemas([]); // Set thành mảng rỗng nếu không phải là mảng
                }
            })
            .catch((error) => {
                console.error("Error fetching cinemas:", error);
            });
    }, []);

    // Thay đổi trạng thái active
    const toggleStatus = (id, currentStatus) => {
        const newStatus = !currentStatus; // Đảo ngược trạng thái hiện tại

        // Gọi API với id và trạng thái mới
        CinemaService.ChangeStatusCinemaHall(id, newStatus)
            .then(() => {
                // Cập nhật trạng thái mới sau khi thành công
                setCinemas(cinemas.map(cinema =>
                    cinema.id === id ? { ...cinema, active: newStatus } : cinema
                ));
            })
            .catch((error) => {
                console.error("Error updating cinema status:", error);
            });
    };

    return (
        <div className="cinema-container">
            <div className="cinema-header">
                <div className="search-box">
                    <input type="text" placeholder="Search..." />
                    <i className="fas fa-search"></i>
                </div>
            </div>
            <table className="cinema-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>isActive</th>
                    <th style={{ textAlign: 'center' }}>Action</th>
                </tr>
                </thead>
                <tbody>
                {cinemas.map((cinema) => (
                    <tr key={cinema.id}>
                        <td>{cinema.id}</td>
                        <td>{cinema.name}</td>
                        <td>{cinema.active ? "Hoạt động" : "Bảo trì"}</td>
                        <td className="action-buttons">
                            <button
                                className="toggle-button"
                                onClick={() => toggleStatus(cinema.id, cinema.active)}
                                style={{ background: cinema.active ? '#087373' : '#e74c3c' }}
                            >
                                {cinema.active ? "Bảo trì" : "Bật hoạt động"}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CinemaTable;
