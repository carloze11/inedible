import Login from "./Login";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="container login-container">
            <div className="card">
                <div className="card-content center">
                    <h3>
                        <i className="fa-solid fa-skull-crossbones"></i>
                        InEdible
                    </h3>
                    <div className="section">
                        <p className="lead">
                            A fullstack web application designed to help users
                            steer clear of any foods that may trigger their food
                            allergies or intolerances.
                        </p>
                    </div>
                    <div className="divider"></div>
                    <div style={{ marginTop: "25px" }}>
                        <Link
                            to="/login"
                            className="btn"
                            style={{ marginRight: "40px" }}
                        >
                            Login
                        </Link>
                        <Link to="/signup" className="btn">
                            Signup
                        </Link>
                    </div>
                    <div className="section"></div>
                </div>
            </div>
        </div>
    );
}
