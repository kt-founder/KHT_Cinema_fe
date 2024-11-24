import React, {useEffect, useState} from "react";
import { Bar } from "react-chartjs-2";


function RankUserTicketStatisticChart({ data }) {
    const [dataChart, setDataChart] = useState({
        labels: [],
        datasets: [
            {
                label: "Users Gained",
                data: [],
                backgroundColor: ["rgba(75,192,192,1)"],
                borderColor: "black",
                borderWidth: 1,
                yAxisID: "y1",
            },
        ],
    });

    useEffect(() => {
        if (data && data.length > 0) {
            const names = data.map(item => item.name);
            const totalTickets = data.map(item => item.totalTickets);
            setDataChart({
                labels: names,
                datasets: [
                    {
                        label: "Rank Revenue Movie",
                        data: totalTickets,
                        backgroundColor: ["#2a71d0"],
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
                text: "Xếp hạng khách hàng mua vé nhiều nhất",
            },
        },
        scales: {
            y1: {
                type: "linear",
                position: "left",
                title: {
                    display: true,
                    text: "Số vé mua",
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
            <div style={{ width: "60%", border: "solid 1px black", backgroundColor: "#f4f3f3" }}>
                <Bar data={dataChart} options={options} />
            </div>
        </div>
    );
}

export default RankUserTicketStatisticChart;
