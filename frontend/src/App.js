import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { Navigate } from "react-router-dom";

// Pages & components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProductSearch from "./pages/ProductSearch";
import Account from "./pages/Account";
import Footer from "./components/Footer";
import ProductInfo from "./pages/ProductInfo";

function App() {
    const { user } = useAuthContext();
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar user={user} />
                <div className="ult-container">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                !user ? <Home /> : <Navigate to="/dashboard" />
                            }
                        />
                        <Route
                            path="/dashboard"
                            element={
                                !user ? <Home /> : <Dashboard user={user} />
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                !user ? <Login /> : <Navigate to="/dashboard" />
                            }
                        />
                        <Route
                            path="/signup"
                            element={
                                !user ? (
                                    <Signup />
                                ) : (
                                    <Navigate to="/dashboard" />
                                )
                            }
                        />
                        <Route
                            path="/products/search"
                            element={!user ? <Home /> : <ProductSearch />}
                        />
                        <Route
                            path="/products/search/info"
                            element={!user ? <Home /> : <ProductInfo />}
                        />
                        <Route
                            path="/account"
                            element={!user ? <Home /> : <Account />}
                        />
                    </Routes>
                </div>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
