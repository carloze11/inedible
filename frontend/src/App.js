import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { Navigate } from "react-router-dom";

// Pages & components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
    const { user } = useAuthContext();
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar user={user} />
                <Routes>
                    <Route
                        path="/"
                        element={
                            !user ? (
                                <Home />
                            ) : (
                                <Navigate to="/dashboard"></Navigate>
                            )
                        }
                    />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route
                        path="/login"
                        element={
                            !user ? <Login /> : <Navigate to="/dashboard" />
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            !user ? <Signup /> : <Navigate to="/dashboard" />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
