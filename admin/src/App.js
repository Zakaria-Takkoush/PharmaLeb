import "./App.css";
import Header from "./components/Header";

import Home from "./pages/Home";
import Medicines from "./pages/Medicines";
import Users from "./pages/Users";
import Pharmacies from "./pages/Pharmacies";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/medicines" element={<Medicines />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/pharmacies" element={<Pharmacies />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
