import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    return (
        <UserContext.Provider value={{ user, setUser, successMessage, setSuccessMessage }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);