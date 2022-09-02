import React from "react";
import Pharmacy from "./Pharmacy";

const PharmacyList = ({ pharmacies }) => {
    return (
        <div className="pharmacy-list">
            {pharmacies.map((pharmacy) => {
                return <Pharmacy key={pharmacy._id} pharmacy={pharmacy} />;
            })}
        </div>
    );
};

export default PharmacyList;
