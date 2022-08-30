import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <nav className="nav-bar">
            <button
                onClick={() => {
                    navigate("/");
                }}
            >
                Home
            </button>
            <button
                onClick={() => {
                    navigate("/users");
                }}
            >
                Users
            </button>
            <button
                onClick={() => {
                    navigate("/pharmacies");
                }}
            >
                Pharmacies
            </button>
            <button
                onClick={() => {
                    navigate("/medicines");
                }}
            >
                Medicines
            </button>
        </nav>
    );
};

export default Navbar;
