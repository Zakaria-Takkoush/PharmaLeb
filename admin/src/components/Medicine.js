import React from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const Medicine = () => {
    return (
        <div className="medicine-card">
            <div className="image">Image here</div>
            <div className="name">Medicine Name</div>
            <div className="code">Medicine Code</div>
            <div className="dosage">Medicine Dosage</div>
            <div className="price">Medicine Price</div>
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
