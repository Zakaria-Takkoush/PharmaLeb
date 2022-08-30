import React, { useEffect, useState } from "react";
import axiosAPI from "../api/axiosAPI";

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
        <>
            {pharmacies.map((pharmacy) => (
                <p>{pharmacy.name}</p>
            ))}
        </>
    );
};

export default Pharmacies;
