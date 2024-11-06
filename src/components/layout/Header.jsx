import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export function Header({ title }) {
    const { token, logout } = useAuth();
    return (
        <div>
            <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
                <div className="flex items-center justify-between">
                    <span className="text-white text-xl font-bold">{title}</span>
                    <div>
                        {token ? (
                            <button
                                onClick={logout}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400 ml-2"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link to="/login" className="text-white bg-indigo-500 px-4 py-2 rounded-lg hover:bg-indigo-400 ml-2">Login</Link>
                                <Link to="/register" className="text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-400 ml-2">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}