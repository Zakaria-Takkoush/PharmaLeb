import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="nav-bar">
            <li>Home</li>
            <li>Users</li>
            <li>Pharmacies</li>
            <li>Medicines</li>
        </nav>
    );
};

export default Navbar;
