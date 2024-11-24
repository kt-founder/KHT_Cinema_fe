import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const MonthlyRevenueStatisticsChart = ({ data }) => {

    const months = data.map(item => item.time);
    const totalPrices = data.map(item => item.totalPrice);
    const totalTickets = data.map(item => item.totalTicket);


    const chartData = {
        labels: months,
        datasets: [
            {
                label: 'Tổng tiền (VND)',
                data: totalPrices,
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                yAxisID: 'y1',
            },
            {
                label: 'Tổng vé bán ra',
                data: totalTickets,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                yAxisID: 'y2',
            },
        ],
    };


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Thống kê tổng tiền và vé bán ra (3 tháng gần đây)',
            },
        },
        scales: {
            y1: {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'Tổng tiền (VND)',
                },
            },
            y2: {
                type: 'linear',
                display: true,
                position: 'right',
                title: {
                    display: true,
                    text: 'Tổng vé bán ra',
                },
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    };

    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f9f9f9',
            }}
        >
            <div style={{width: '60%', border:'solid 1px black'}}>
                <Bar data={chartData} options={options}/>
            </div>
        </div>
    );
};

export default MonthlyRevenueStatisticsChart;
