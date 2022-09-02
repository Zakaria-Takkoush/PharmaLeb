import React, { useEffect, useState } from "react";
import axiosAPI from "../api/axiosAPI";
import PharmacyList from "../components/PharmacyList";

const Pharmacies = () => {
    const [pharmacies, setPharmacies] = useState([]);

    const getPharmacies = async () => {
        try {
            const res = await axiosAPI.get("/pharmacies");
            const data = await res.data;
            setPharmacies(data.pharmacies);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getPharmacies();
    }, []);

    return (
        <div className="pharmacy-container">
            <h2>List of Pharmacies</h2>
            <PharmacyList pharmacies={pharmacies} />
        </div>
    );
};

export default Pharmacies;
