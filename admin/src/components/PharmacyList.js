import React from "react";
import Pharmacy from "./Pharmacy";

const PharmacyList = ({ pharmacies }) => {
    return (
        <>
            {pharmacies.map((pharmacy) => {
                return <Pharmacy key={pharmacy._id} pharmacy={pharmacy} />;
            })}
        </>
    );
};

export default PharmacyList;
