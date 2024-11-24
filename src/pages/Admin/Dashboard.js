import React, {useEffect, useState} from 'react';
import MonthlyRevenueStatisticsChart from "../../components/MonthlyRevenueStatisticsChart";
import RankUserTicketStatisticChart from "../../components/RankUserTicketStatisticChart";
import RankRevenueMovieStatisticChart from "../../components/RankRevenueMovieStatisticChart";
import {Spin} from "antd";

const Dashboard = () => {
    const [statistic1, setStatistic1] = useState([])
    const [statistic2, setStatistic2] = useState([])
    const [statistic3, setStatistic3] = useState([])
    const [loading, setLoading] = useState(true);
    const fetchData1 = async () => {
        try {
            const response = await fetch('http://localhost:8080/tickets/get-statistic-total-ticket-sold-by-user');
            const result = await response.json();
            setStatistic1(result.data);
        } catch (error){
            console.error('Error fetching data:', error);
        }
    };
    const fetchData2 = async () => {
        try {
            const response = await fetch('http://localhost:8080/tickets/get-statistic-revenue-movie');
            const result = await response.json();
            setStatistic2(result.data);
        } catch (error){
            console.error('Error fetching data:', error);
        }
    };
    const fetchData3 = async () => {
        try {
            const response = await fetch('http://localhost:8080/tickets/get-statistic-total-price');
            const result = await response.json();
            setStatistic3(result.data);
        } catch (error){
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            await fetchData1();
            await fetchData3();
            await fetchData2();
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <div style={{textAlign: 'center'}}>
            <h1 style={{color: '#ac2121'}}>Admin Dashboard</h1>
            <p style={{color: '#ac2121'}}>Welcome to the admin dashboard.</p>
            <div style={{marginTop: '20px'}}>
                {loading ? (
                        <Spin tip="Loading..." size="large"/>
                    ) :
                    null
                }
            </div>
            <div style={{marginTop: '20px'}}>
                <RankUserTicketStatisticChart data={statistic1}/>
            </div>
            <div style={{marginTop: '20px'}}>
                <RankRevenueMovieStatisticChart data={statistic2}/>
            </div>
            <div style={{marginTop: '20px'}}>
                <MonthlyRevenueStatisticsChart data={statistic3}/>
            </div>
        </div>
    );
};

export default Dashboard;
