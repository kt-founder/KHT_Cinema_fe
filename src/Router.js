import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import React from "react";
import Movie from "./pages/Movie";
import SignUp from "./pages/SignUp";

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/login" element={<Login />} />
            <Route path="/movie" element={<Movie />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    );
}
export default AppRouter;