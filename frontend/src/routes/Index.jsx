import { Link } from "react-router-dom";

export default function Index() {
    return (
        <div className="container login-container">
            <div className="card">
                <div className="card-content">
                    <h3>
                        <i className="fa-solid fa-skull-crossbones"></i>
                        InEdible
                    </h3>
                    <div className="section">
                        <p className="lead">
                            A fullstack web application designed to help users
                            steer clear of any foods that may trigger their food
                            allergies or intolerances.{" "}
                        </p>
                    </div>
                    <div className="divider"></div>
                    <div className="section">
                        <Link to="/auth/google" className="btn red darken-1">
                            <i className="fab fa-google left"></i> Log In With
                            Google
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
