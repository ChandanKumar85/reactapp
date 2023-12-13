import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { content } from "./Constants";

export default function Authentication() {
    const navigate = useNavigate();
    const END_POINT_URL = 'http://localhost:3100'

    const getToken = () => {
        const tokenString = localStorage.getItem(content.ACCESS_TOKEN)
        const userToken = tokenString && JSON.stringify(tokenString)
        return userToken;
    }

    const getUserDetail = () => {
        const userString = localStorage.getItem('user')
        const user_detail = JSON.stringify(userString)
        return user_detail;
    }

    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUserDetail());

    const saveToken = (token, user) => {
        localStorage.setItem(content.ACCESS_TOKEN, JSON.stringify(token))
        localStorage.setItem('user', JSON.stringify(user))

        setToken(token)
        setUser(user)
        navigate('/dashboard')
    }

    // Create and Login User
    const http = axios.create({
        baseURL: END_POINT_URL,
        headers: {
            "Content-Type": "application/json"
        }
    })

    // Logout User
    const logout = () => {
        localStorage.removeItem(content.ACCESS_TOKEN);
        localStorage.removeItem('user');
        navigate('/login')
    }

    return {
        setToken: saveToken,
        token,
        user,
        getToken,
        http,
        logout
    }
}