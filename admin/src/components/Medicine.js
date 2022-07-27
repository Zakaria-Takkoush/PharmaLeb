import React from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import axiosAPI from "../api/axiosAPI";

const Medicine = ({ medicine, medicines, setMedicines }) => {
    // Delete medicine
    const handleDelete = () => {
        deleteMedicine();
    };

    // Delete API
    const deleteMedicine = async () => {
        try {
            const res = await axiosAPI.delete(`/medicines/${medicine._id}`);
            const deleted = res.data.deleted;
            setMedicines((prevMedicines) =>
                prevMedicines.filter((medicine) => medicine._id !== deleted._id)
            );
        } catch (error) {
            console.log(error.response.data);
        }
    };

    return (
        <div className="medicine-card">
            <div className="image">
                <img
                    className="medicine-img"
                    src={medicine.image}
                    alt="No Image"
                />
            </div>
            <div className="name">{medicine.name}</div>
            <div className="code">{medicine.code}</div>
            <div className="dosage">{medicine.dosage}</div>
            <div className="price">{medicine.price}</div>
            <div className="edit">
                <button>
                    Edit <AiFillEdit color="#009FFF" size={18} />
                </button>
            </div>
            <div className="delete">
                <button onClick={handleDelete}>
                    Delete <AiFillDelete color="tomato" size={18} />
                </button>
            </div>
        </div>
    );
};

export default Medicine;
