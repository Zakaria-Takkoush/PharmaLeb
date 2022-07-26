import React from "react";
import logo from "../assets/logo/logo.png";

const Header = () => {
    return (
        <div className="header">
            <img className="logo" src={logo} />
            <h1 className="header-title">Welcome to PharmaLeb Admin Panel</h1>
        </div>
    );
};

export default Header;
