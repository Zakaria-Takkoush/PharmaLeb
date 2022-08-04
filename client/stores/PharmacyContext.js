// This file stores the pharmacy data

import React, { useState } from "react";

export const PharmacyContext = React.createContext();

const PharmacyProvider = ({ children }) => {
    const [pharmacyData, setPharmacyData] = useState([]);

    return (
        <PharmacyContext.Provider
            value={{
                pharmacyData,
                setPharmacyData,
            }}
        >
            {children}
        </PharmacyContext.Provider>
    );
};

export default PharmacyProvider;
