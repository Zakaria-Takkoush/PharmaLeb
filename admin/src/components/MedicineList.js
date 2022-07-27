import React from "react";
import Medicine from "./Medicine";

const MedicineList = ({ medicines, setMedicines }) => {
    return (
        <div className="medicine-list">
            {medicines.map((medicine) => (
                <Medicine
                    key={medicine._id}
                    medicine={medicine}
                    medicines={medicines}
                    setMedicines={setMedicines}
                />
            ))}
        </div>
    );
};

export default MedicineList;
