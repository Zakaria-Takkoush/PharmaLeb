import React from "react";
import { useEffect, useState } from "react";
import axiosAPI from "../api/axiosAPI";
import AddMedicine from "../components/AddMedicine";
import MedicineList from "../components/MedicineList";

const Medicines = () => {
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
        <div className="container">
            <AddMedicine medicines={medicines} setMedicines={setMedicines} />
            <MedicineList medicines={medicines} setMedicines={setMedicines} />
        </div>
    );
};

export default Medicines;
