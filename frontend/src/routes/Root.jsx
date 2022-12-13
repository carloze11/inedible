import { Link } from "react-router-dom";
export default function Root() {
    return (
        <>
            <nav className="grey darken-3">
                <div className="nav-wrapper container">
                    <Link to="/" className="brand-logo center">
                        <i className="fa-solid fa-skull-crossbones"></i>InEdible
                    </Link>
                    <a
                        href="#"
                        data-target="slide-out"
                        className="sidenav-trigger show-on-large"
                    >
                        <i className="fas fa-bars"></i>
                    </a>
                    <ul className="sidenav" id="slide-out">
                        <li>
                            <a href="/dashboard">Dashboard</a>
                        </li>
                        <li>
                            <a href="/foods">Community Food</a>
                        </li>
                        <li>
                            <a href="/products/search">Search Products</a>
                        </li>
                        <li>
                            <a href="/auth/logout">Logout</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="container login-container">
                <div className="card">
                    <div className="card-content">
                        <h3>
                            <i className="fa-solid fa-skull-crossbones"></i>
                            InEdible
                        </h3>
                        <div className="section">
                            <p className="lead">
                                A fullstack web application designed to help
                                users steer clear of any foods that may trigger
                                their food allergies or intolerances.{" "}
                            </p>
                        </div>
                        <div className="divider"></div>
                        <div className="section">
                            <Link
                                to="/auth/google"
                                className="btn red darken-1"
                            >
                                <i className="fab fa-google left"></i> Log In
                                With Google
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
