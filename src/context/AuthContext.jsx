import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const navigate = useNavigate();

    const login = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        if (localStorage.getItem('error') !== "") {
            localStorage.removeItem('error');
        }
        navigate('/login', { state: { error: "" } });
        return;
    }
    const logout1 = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        if (localStorage.getItem('error') !== "") {
            const message = localStorage.getItem('error');
            localStorage.removeItem('error');
            navigate('/login', { state: { error: message } });
        }
        else {
            navigate('/login', { state: { error: "You must be logged in to access the profile page" } });
        }
    }
    return (
        <AuthContext.Provider value={{ user, setUser, token, setToken, login, logout, logout1 }}>
            {children}
        </AuthContext.Provider>
    );
};
