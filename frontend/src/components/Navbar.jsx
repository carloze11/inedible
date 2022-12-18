import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css";

export default function Navbar() {
    useEffect(() => {
        M.Sidenav.init(document.querySelectorAll(".sidenav"));
    }, []);

    return (
        <nav className="grey darken-3">
            <div className="nav-wrapper container">
                <Link to="/dashboard" className="brand-logo center">
                    <i className="fa-solid fa-skull-crossbones"></i>InEdible
                </Link>
                <a
                    href="#"
                    data-target="mobile-demo"
                    className="sidenav-trigger show-on-large"
                >
                    <i className="fas fa-bars"></i>
                </a>
                <ul className="sidenav" id="mobile-demo">
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
    );
}
