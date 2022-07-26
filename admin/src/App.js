import "./App.css";
import AddMedicine from "./components/AddMedicine";
import Header from "./components/Header";
import MedicineList from "./components/MedicineList";

function App() {
    return (
        <div className="App">
            <Header />
            <AddMedicine />
            <MedicineList />
        </div>
    );
}

export default App;
