import React, { useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import axiosAPI from "../api/axiosAPI";

const Medicine = ({ medicine, medicines, setMedicines }) => {
    const [edited, setEdited] = useState({ ...medicine });
    const [canEdit, setCanEdit] = useState(false);

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
        <>
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
            <div className="edit-medicine">
                <form className="edit-medicine-form">
                    <div className="medicine-name">
                        <label>Name:</label>
                        <input
                            type="text"
                            defaultValue={medicine.name}
                            onChange={(e) =>
                                setEdited({
                                    ...edited,
                                    name: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="medicine-code">
                        <label>Code:</label>
                        <input
                            type="text"
                            defaultValue={medicine.code}
                            onChange={(e) =>
                                setEdited({
                                    ...edited,
                                    code: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="medicine-dosage">
                        <label>Dosage:</label>
                        <input
                            type="text"
                            defaultValue={medicine.dosage}
                            onChange={(e) =>
                                setEdited({
                                    ...edited,
                                    dosage: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="medicine-price">
                        <label>Price: (LL)</label>
                        <input
                            type="text"
                            defaultValue={medicine.price}
                            onChange={(e) =>
                                setEdited({
                                    ...edited,
                                    price: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="medicine-image">
                        <label>Image URL:</label>
                        <input
                            type="text"
                            defaultValue={medicine.image}
                            onChange={(e) =>
                                setEdited({
                                    ...edited,
                                    image: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <input
                            className="submit-add"
                            type="submit"
                            value={"Edit Medicine"}
                        />
                    </div>
                </form>
            </div>
        </>
    );
};

export default Medicine;
