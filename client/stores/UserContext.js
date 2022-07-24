// This file stores the user data

import React, { useState } from "react";

export const UserContext = React.createContext();

const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState([]);

    return (
        <UserContext.Provider
            value={{
                userData,
                setUserData,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
