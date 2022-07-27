import React, { useState } from "react";
import axiosAPI from "../api/axiosAPI";

const AddMedicine = ({ medicines, setMedicines }) => {
    const [medicine, setMedicine] = useState({
        name: "",
        code: "",
        dosage: "",
        price: "",
        image: "",
    });

    const clearFields = () => {
        setMedicine({
            name: "",
            code: "",
            dosage: "",
            price: "",
            image: "",
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            medicine.name === "" ||
            medicine.dosage === "" ||
            medicine.code === "" ||
            medicine.price === ""
        ) {
            alert("Enter all fields!");
        }
        const data = {
            ...medicine,
            price: `${medicine.price} L.L`,
        };
        addMedicine(data);
        clearFields();
    };

    const addMedicine = async (data) => {
        try {
            const res = await axiosAPI.post("/medicines", data);
            const medicineAdded = res.data;
            setMedicines([...medicines, medicineAdded]);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    return (
        <div className="add-medicine">
            <h2 className="add-header">Add a medicine</h2>
            <form className="add-medicine-form" onSubmit={handleSubmit}>
                <div className="medicine-name">
                    <label>Name:</label>
                    <input
                        type="text"
                        value={medicine.name}
                        onChange={(e) =>
                            setMedicine({ ...medicine, name: e.target.value })
                        }
                    />
                </div>
                <div className="medicine-code">
                    <label>Code:</label>
                    <input
                        type="text"
                        value={medicine.code}
                        onChange={(e) =>
                            setMedicine({ ...medicine, code: e.target.value })
                        }
                    />
                </div>
                <div className="medicine-dosage">
                    <label>Dosage:</label>
                    <input
                        type="text"
                        value={medicine.dosage}
                        onChange={(e) =>
                            setMedicine({ ...medicine, dosage: e.target.value })
                        }
                    />
                </div>
                <div className="medicine-price">
                    <label>Price: (LL)</label>
                    <input
                        type="text"
                        value={medicine.price}
                        onChange={(e) =>
                            setMedicine({ ...medicine, price: e.target.value })
                        }
                    />
                </div>
                <div className="medicine-image">
                    <label>Image URL:</label>
                    <input
                        type="text"
                        value={medicine.image}
                        onChange={(e) =>
                            setMedicine({ ...medicine, image: e.target.value })
                        }
                    />
                </div>
                <div>
                    <input
                        className="submit-add"
                        type="submit"
                        value={"Add Medicine"}
                    />
                </div>
            </form>
        </div>
    );
};

export default AddMedicine;
