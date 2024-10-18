import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './StylesComponent/leftcontainer.css'; // Chứa các CSS mà chúng ta sẽ thêm

const LeftContainer = () => {
    const [isDashboardOpen, setDashboardOpen] = useState(true);

    const toggleDashboard = () => {
        setDashboardOpen(!isDashboardOpen);
    };
    return (
        <div className="left-container-custom">
            <div className="user-profile">
                <img
                    src="https://via.placeholder.com/100" // Thay thế bằng link ảnh thật của người dùng
                    alt="Profile"
                    className="profile-image"
                />
                <div className="user-info">
                    <h3>John David</h3>
                    <span className="user-status">
            <span className="status-indicator online"></span>
            Online
          </span>
                </div>
            </div>

            <nav className="nav-menu">
                {/*<h4 className="menu-heading">General</h4>*/}
                <ul>
                    <li>
                        <Link to="/admin/dashboard">
                            <i className="fas fa-tachometer-alt"></i> Dashboard
                        </Link>
                    </li>

                    <li onClick={toggleDashboard}>
                        <Link to={null} style={{alignItems: 'center'}}>
                            <i className="fa fa-caret-down" aria-hidden="true"></i> Account
                        </Link>
                        {/* Sub-menu items, chỉ hiển thị nếu isDashboardOpen là true */}
                        {isDashboardOpen && (
                            <ul style={{marginLeft:'40px'}}>
                                <li>
                                    <Link to="/admin/manage-user"><i className="fas fa-user"></i>User</Link>
                                </li>
                                <li>
                                    <Link to="/admin/dashboard/stats"><i className="fas fa-ad"></i> Admin</Link>
                                </li>
                            </ul>
                        )}
                    </li>

                    <li>
                        <Link to="/admin/movie">
                            <i className="fa fa-film" aria-hidden="true"></i> Movie
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/showtime">
                            <i className="fa fa-calendar-days"></i> Show Time
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/cinema">
                            <i className="fa fa-warehouse"></i> Cinema Hall
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/ticket">
                            <i className="fa fa-ticket" aria-hidden="true"></i> Ticket
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default LeftContainer;
