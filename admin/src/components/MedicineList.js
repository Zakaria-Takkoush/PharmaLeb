import React, { useContext } from "react";
import Medicine from "./Medicine";

const MedicineList = ({ medicines }) => {
    return (
        <div className="medicine-list">
            {medicines.map((medicine) => (
                <Medicine key={medicine._id} medicine={medicine} />
            ))}
        </div>
    );
};

export default MedicineList;
