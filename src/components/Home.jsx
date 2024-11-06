import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FadeLoader } from 'react-spinners';
import { Header } from '../components/layout/Header';
import { Link } from 'react-router-dom';

export function Home() {
    const { token } = useAuth();
    return (
        <>
            <div>
                <Header title="Home" />
                <div className="p-4">
                    {
                        token ? (
                            <div className="flex flex-col items-center">
                                <h2 className="text-2xl font-bold mb-4">You are logged in</h2>
                                <Link to="/profile" className="bg-blue-500 mt-4 text-white px-4 py-2 rounded-lg hover:bg-blue-400">View Profile</Link>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <h2 className="text-2xl font-bold mb-4">You are not logged in, please login</h2>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
}