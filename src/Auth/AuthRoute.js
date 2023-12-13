import { Route, Routes, useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from './ForgotPassword';

const AuthRoute = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const pathname = window.location.pathname;
        if (pathname === '/register') {
            navigate('/register');
        } else if (pathname === '/forgot-password') {
            navigate('/forgot-password');
        } else if (pathname !== '/') {
            navigate('/login');
        }
    }, [navigate])
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route index path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
        </Routes>
    )
}

export default AuthRoute