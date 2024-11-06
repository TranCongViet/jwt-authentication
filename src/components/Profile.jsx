import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FadeLoader } from 'react-spinners';
import { Header } from '../components/layout/Header'

export function Profile() {
    const { token, logout, user, setUser, setToken, logout1 } = useAuth();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data.user);
                setLoading(false);
            } catch (error) {
                localStorage.setItem('error', `${error.response.data.message}, you must be logged in to view this profile`);
                logout1();
                setLoading(false);
            }
        };
        if (token) {
            fetchProfile();
        } else {
            navigate('/login');
        }
    }, [token, navigate]);

    return (
        <>
            <div>
                <Header title="Profile" />
                <div className="p-4">
                    {loading ? (
                        <div className="flex items-center justify-center bg-gray-100">
                            <FadeLoader />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
                            <p><strong>ID:</strong> {user.sub}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                        </div>
                    )}
                </div>
            </div >
        </>
    );
}