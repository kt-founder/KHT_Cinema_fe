import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Admin/Dashboard";
import AdminLayout from "./pages/Admin/HomeAdmin";
import LoginAdmin from "./pages/Admin/LoginAdmin";
import MovieTable from "./pages/Admin/MovieTable";
import CinemaTable from "./pages/Admin/CinemallTable";


function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route  path="/admin" element={sessionStorage.getItem("HKT_ACCESS_TOKEN_ADMIN") != null ? <AdminLayout /> : <LoginAdmin/>}>
                {/* Các route con của /admin */}
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="movie" element={<MovieTable />} />
                <Route path="cinema" element={<CinemaTable />} />
            </Route>
        </Routes>
    );
}
export default AppRouter;