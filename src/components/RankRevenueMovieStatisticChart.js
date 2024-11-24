import React, {useEffect, useState} from "react";
import { Bar } from "react-chartjs-2";


function RankRevenueMovieStatisticChart({ data }) {
    const [dataChart, setDataChart] = useState({
        labels: [],
        datasets: [
            {
                label: "Rank Revenue Movie",
                data: [],
                backgroundColor: ["#2a71d0"],
                borderColor: "black",
                borderWidth: 1,
                yAxisID: "y1",
            },
        ],
    });
    useEffect(() => {
        if (data && data.length > 0) {
            const movie = data.map(item => item.movie_name);
            const totalPrices = data.map(item => item.revenue);
            setDataChart({
                labels: movie,
                datasets: [
                    {
                        label: "Users Gained",
                        data: totalPrices,
                        backgroundColor: ["rgba(75,192,192,1)"],
                        borderColor: "black",
                        borderWidth: 1,
                        yAxisID: "y1",
                    },
                ],
            });
        }
    }, [data]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Xếp hạng doanh thu theo phim cao nhất",
            },
        },
        scales: {
            y1: {
                type: "linear",
                display: true,
                position: "left",
                title: {
                    display: true,
                    text: "Tổng doanh thu (VND)",
                },
            },
        },
    };

    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f9f9f9",
            }}
        >
            <div style={{ width: "60%", border: "solid 1px black" }}>
                <Bar data={dataChart} options={options} />
            </div>
        </div>
    );
}

export default RankRevenueMovieStatisticChart;