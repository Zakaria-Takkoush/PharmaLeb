import React from "react";
import Map from "./Map";

const Pharmacy = ({ pharmacy }) => {
    return (
        <div className="pharmacy-card">
            <h3>{pharmacy.name}</h3>
            <p>Address: {pharmacy.address}</p>
            <p>Phone #: {pharmacy.phone_number}</p>
            <Map location={pharmacy.location} />
        </div>
    );
};

export default Pharmacy;
