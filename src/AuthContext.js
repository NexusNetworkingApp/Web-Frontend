// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from './util/URL';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem('isLoggedIn') === 'true';
    });
    const [account, setAccount] = useState(null);

    const login = async (accountType, email, password) => {
        try {
            const response = await axios.get(`${API_URL}/account/login-${accountType}/${email}/${password}`);
            const loginSuccessful = response.data;

            if (loginSuccessful) {
                setIsLoggedIn(true);
                // Save to localStorage
                localStorage.setItem('isLoggedIn', 'true');

                // Fetch account information and save it
                const accountResponse = await axios.get(`${API_URL}/account/info/${accountType}/${email}`);
                const accountData = accountResponse.data;
                setAccount(accountData);
                localStorage.setItem('account', JSON.stringify(accountData));
                console.log('Account Data:', accountData);
            } else {
                console.log('Login failed');
            }

            return loginSuccessful;
        } catch (error) {
            console.error('Login failed:', error.message);
            return false;
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        setAccount(null);
        // Remove from localStorage
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('account');
        window.location.href = '/';
    };

    useEffect(() => {
        console.log('isLoggedIn in useEffect:', isLoggedIn);
    }, [isLoggedIn]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, account }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
