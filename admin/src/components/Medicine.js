import React from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const Medicine = ({ medicine }) => {
    return (
        <div className="medicine-card">
            <div className="image">
                <img className="medicine-img" src={medicine.image} />
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
                <button>
                    Delete <AiFillDelete color="tomato" size={18} />
                </button>
            </div>
        </div>
    );
};

export default Medicine;
