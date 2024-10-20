import {Route, Routes} from "react-router-dom";
import Home from "./pages/User/Home";
import Login from "./pages/User/Login";
import SignUp from "./pages/User/SignUp";
import Dashboard from "./pages/Admin/Dashboard";
import AdminLayout from "./pages/Admin/HomeAdmin";
import LoginAdmin from "./pages/Admin/LoginAdmin";
import MovieTable from "./pages/Admin/MovieTable";
import CinemaTable from "./pages/Admin/CinemallTable";
import UserProfile from "./pages/User/Profile";
import UserTable from "./pages/Admin/UserTable";
import ForgotPassword from "./pages/User/ForgotPassword";
import VerifyOTP from "./pages/User/VerifyOTP";
import UpdatePassword from "./pages/User/UpdatePassword";
import MovieList from "./components/MovieList";
import MovieDetail from "./pages/User/MovieDetail";


function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/myInfor" element={<UserProfile/>}/>
            <Route path="/forgot-password" element={<ForgotPassword/>} />
            <Route path="/verify" element={<VerifyOTP/>} />
            <Route path="/update-password" element={<UpdatePassword/>} />
            <Route path="/" element={<MovieList />} />
            <Route path="/movies/:id" element={<MovieDetail />} /> {/* Route cho chi tiết phim */}
            <Route  path="/admin" element={sessionStorage.getItem("HKT_ACCESS_TOKEN_ADMIN") != null ? <AdminLayout /> : <LoginAdmin/>}>
                {/* Các route con của /admin */}
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="movie" element={<MovieTable />} />
                <Route path="cinema" element={<CinemaTable />} />
                <Route path="manage-user" element={<UserTable/>}/>
            </Route>
        </Routes>
    );
}
export default AppRouter;