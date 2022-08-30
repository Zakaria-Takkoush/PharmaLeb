import "./App.css";
import Header from "./components/Header";

import Home from "./pages/Home";
import Medicines from "./pages/Medicines";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <>
            <Header />
            <Medicines />
        </>
    );
}

export default App;
