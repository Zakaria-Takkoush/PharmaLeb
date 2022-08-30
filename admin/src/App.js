import "./App.css";
import AddMedicine from "./components/AddMedicine";
import Header from "./components/Header";
import MedicineList from "./components/MedicineList";
import axiosAPI from "./api/axiosAPI";
import { useEffect, useState } from "react";

import Home from "./pages/Home";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
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
        <>
            <Header />
            <div className="container">
                <AddMedicine
                    medicines={medicines}
                    setMedicines={setMedicines}
                />
                <MedicineList
                    medicines={medicines}
                    setMedicines={setMedicines}
                />
            </div>
        </>
    );
}

export default App;
