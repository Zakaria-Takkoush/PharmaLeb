import "./App.css";
import AddMedicine from "./components/AddMedicine";
import Header from "./components/Header";
import MedicineList from "./components/MedicineList";
import axiosAPI from "./api/axiosAPI";
import { useEffect, useState } from "react";

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
            <AddMedicine medicines={medicines} setMedicines={setMedicines} />
            <MedicineList medicines={medicines} setMedicines={setMedicines} />
        </>
    );
}

export default App;
