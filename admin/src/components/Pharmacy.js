import React from "react";

const Pharmacy = ({ pharmacy }) => {
    return (
        <div className="pharmacy-card">
            <h3>{pharmacy.name}</h3>
            <p>Address: {pharmacy.address}</p>
            <p>Phone #: {pharmacy.phone_number}</p>
        </div>
    );
};

export default Pharmacy;
