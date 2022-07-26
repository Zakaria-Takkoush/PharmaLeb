import React from "react";
import axiosAPI from "../api/axiosAPI";
import Medicine from "./Medicine";
import { useState, useEffect } from "react";
const MedicineList = () => {
    const [medicines, setMedicines] = useState([]);

    const fetchMedicines = async () => {
        try {
            const res = await axiosAPI.get("/medicines");
            const medicines = await res.data;
            setMedicines(medicines);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    useEffect(() => {
        fetchMedicines();
    }, []);

    return (
        <div className="medicine-list">
            {medicines.map((medicine) => (
                <Medicine key={medicine._id} medicine={medicine} />
            ))}
        </div>
    );
};

export default MedicineList;
