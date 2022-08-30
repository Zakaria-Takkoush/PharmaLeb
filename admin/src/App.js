import "./App.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

// pages
import Home from "./pages/Home";
import Medicines from "./pages/Medicines";
import Users from "./pages/Users";
import Pharmacies from "./pages/Pharmacies";
import InvalidPage from "./pages/InvalidPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/medicines" element={<Medicines />} />
                <Route path="/users" element={<Users />} />
                <Route path="/pharmacies" element={<Pharmacies />} />
                <Route path="*" element={<InvalidPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
