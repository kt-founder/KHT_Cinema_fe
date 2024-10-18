import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import '../styles/HomeAdmin.css';
import LeftContainerAdmin from "../../components/left-containerAdmin";
import Header from "../../components/Headerr"; // Thêm file CSS này

const AdminLayout = () => {
    const location = useLocation();

    // Kiểm tra nếu route là "/admin/login" thì không hiển thị left-container
    const isLoginPage = location.pathname === '/admin/login';

    return (
        <div className="admin-layout">
            {/* Nếu không phải là trang login thì hiển thị left-container */}
            {!isLoginPage && (
                <LeftContainerAdmin/>
            )}

            {/* Right container */}
            <div className={`right-container ${isLoginPage ? 'full-width' : ''}`}>
                <Header/>
                {/* Outlet sẽ hiển thị nội dung của các route con */}
                <div className={'content'}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
