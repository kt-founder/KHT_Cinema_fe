import React from 'react';

function CinemaList({ cinemas }) {
    if (!cinemas || cinemas.length === 0) {
        return <p>Không có rạp chiếu phim thịnh hành.</p>;
    }

    return (
        <div className="cinema-list">
            {cinemas.map((cinema) => (
                <div key={cinema.id} className="cinema-item">
                    <h3>{cinema.name}</h3>
                    <p>Địa chỉ: {cinema.address}</p>
                    <p>Số lượng phòng chiếu: {cinema.screens}</p>
                </div>
            ))}
        </div>
    );
}

export default CinemaList;
