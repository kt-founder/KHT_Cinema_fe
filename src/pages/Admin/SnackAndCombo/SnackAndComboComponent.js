import React, {useEffect, useState} from 'react';
import {notification, Spin} from "antd";
import SnackCDialog from "../../../components/SnackCDialog";
import SnackEDialog from "../../../components/SnackEDialog";
import ComboCDialog from "../../../components/ComboCDialog";
import ComboEDialog from "../../../components/ComboEDialog";
const SnackAndComboComponent = () => {
    const [snacks, setSnacks] = useState(null);
    const [combo, setCombo] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchDataSnacks = async () => {
        try {
            const response = await fetch('http://localhost:8080/snacks/get-snacks');
            const result = await response.json();
            setSnacks(result.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchDataCombo = async () => {
        try {
            const response = await fetch('http://localhost:8080/combo/get-combo');
            const result = await response.json();
            setCombo(result.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            await fetchDataSnacks();
            await fetchDataCombo();
            setLoading(false);
        };
        fetchData();
    }, []);

    const disableSnack = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/snacks/delete-snacks?snackId=${id}`,{
                method:'DELETE'
            });
            const result = await response.json();
            if (result.message === 'Successful'){
                notification["success"]({
                    message: "Change status snack successful",
                });
                window.location.reload()
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            notification["error"]({
                message: "Change status snack not successful",
            });
        }
    }

    const disableCombo = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/combo/delete-combo?comboId=${id}`,{
                method:'DELETE'
            });
            const result = await response.json();
            if (result.message === 'Successful'){
                notification["success"]({
                    message: "Change status combo successful",
                });
                window.location.reload()
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            notification["error"]({
                message: "Change status combo not successful",
            });
        }
    }
    return (
        <div className="movie-container">
            <div className="movie-header">
                <h1>I. Snacks</h1>
                {/*<div style={{padding:'8px', border:'1px green solid', cursor:'pointer'}}>Thêm Snack</div>*/}
                <SnackCDialog/>
            </div>
            <table className="movie-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th style={{textAlign: 'center'}}>Price</th>
                    <th style={{textAlign:'center'}}>Status</th>
                    <th style={{textAlign: 'center'}}>Action</th>
                </tr>
                </thead>
                <tbody>
                {snacks != null && snacks.map((s) => (
                    <tr key={s.id}>
                        <td>{s.id}</td>
                        <td>{s.name}</td>
                        <td><img style={{width: '70px', height: '70px'}} alt={"Not Available"} src={s.img}/></td>
                        <td style={{textAlign: 'center'}}>{new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                        }).format(s.price )
                            .replace('₫', 'VNĐ')}</td>
                        <td style={{textAlign: 'center'}}>
                            {s.active.toString() === 'true' ?
                                <span
                                    style={{color: 'green', border: '2px solid green', padding: '4px'}}>Available</span>
                                :
                                <span style={{
                                    color: 'orange',
                                    border: '2px solid orange',
                                    padding: '4px'
                                }}>UnAvailable</span>
                            }
                        </td>
                        <td>
                            <SnackEDialog snack={s}/>
                            <button className="delete-button" style={{padding: '7px'}}>
                                {s.active ?
                                    <i className="fa-solid fa-lock" onClick={() => disableSnack(s.id)}></i>
                                    :
                                    <i className="fa-solid fa-unlock" onClick={() => disableSnack(s.id)}></i>}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div style={{marginTop: '20px'}}>
                {loading ? (
                        <Spin tip="Loading..." size="large"/>
                    ) :
                    null
                }
            </div>
            <hr/>
            <div className="movie-header" style={{marginTop:'20px'}}>
                <h1>II. Combo</h1>
                {/*<div style={{padding:'8px', border:'1px green solid', cursor:'pointer'}}>Thêm Combo</div>*/}
                <ComboCDialog/>
            </div>
            <table className="movie-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Description</th>
                    <th style={{textAlign: 'center'}}>Price</th>
                    <th style={{textAlign:'center'}}>Status</th>
                    <th style={{textAlign: 'center'}}>Action</th>
                </tr>
                </thead>
                <tbody>
                {combo != null && combo.map((c) => (
                    <tr key={c.id}>
                        <td>{c.id}</td>
                        <td>{c.name}</td>
                        <td><img style={{width: '70px', height: '70px'}} alt={"Not Available"} src={c.img}/></td>
                        <td>
                            {c.infoCombo.map((i) => (
                                <div key={i.idSnack}>
                                    {i.quantity} {i.nameSnack}
                                </div>
                            ))}
                        </td>
                        <td style={{textAlign: 'center'}}>{new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                        }).format(c.price )
                            .replace('₫', 'VNĐ')}</td>
                        <td style={{textAlign: 'center'}}>
                            {c.active.toString() === 'true' ?
                                <span
                                    style={{color: 'green', border: '2px solid green', padding: '4px'}}>Available</span>
                                :
                                <span style={{
                                    color: 'orange',
                                    border: '2px solid orange',
                                    padding: '4px'
                                }}>UnAvailable</span>
                            }
                        </td>
                        <td>
                            <ComboEDialog combo={c}/>
                            <button className="delete-button" style={{padding: '7px'}}>
                                {c.active ?
                                    <i className="fa-solid fa-lock" onClick={() => disableCombo(c.id)}></i>
                                    :
                                    <i className="fa-solid fa-unlock" onClick={() => disableCombo(c.id)}></i>}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div style={{marginTop: '20px'}}>
                {loading ? (
                        <Spin tip="Loading..." size="large"/>
                    ) :
                    null
                }
            </div>
        </div>
    );
};

export default SnackAndComboComponent;
