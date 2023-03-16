import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// Pages & components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

function App() {
    const { user } = useAuthContext();
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
