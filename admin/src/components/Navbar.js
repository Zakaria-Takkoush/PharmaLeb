import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="nav-bar">
            <button>Home</button>
            <button>Users</button>
            <button>Pharmacies</button>
            <button>Medicines</button>
        </nav>
    );
};

export default Navbar;
