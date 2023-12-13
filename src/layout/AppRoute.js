import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import DashboardHome from "../Components/DashboardHome";
import Employee from "../Components/Employee";
import EmployeeForm from "../Components/FormAddEdit";
import MyAccount from "../Components/MyAccount";
import Profile from "../Components/Profile";
import NotFoundPage from "./NotFoundPage";
import ChangePassword from '../Components/ChangePassword';
import EditProfile from '../Components/Profile/EditProfile';

const AppRoute = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const pathname = window.location.pathname;
        if (pathname === '/') {
            navigate('/dashboard');
        }
    }, [navigate])

    return (
        <Routes>
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="employees" element={<Employee />} />
            <Route path="add-employee" element={<EmployeeForm />} />
            <Route path="profile" element={<Profile />} >
                <Route path="edit" element={<EditProfile />} />
            </Route>
            <Route path="my-account" element={<MyAccount />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}

export default AppRoute
