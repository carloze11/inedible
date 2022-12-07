import React, { useEffect } from "react";
// import M from "materialize-css";

export default function Navbar() {
    // Trying to make sidenav from Materialize work with React

    // useEffect(() => {
    //     let sideNav = document.querySelector("#slide-out");
    //     M.Sidenav.init(sideNav, {});
    // }, []);

    return (
        <nav className="grey darken-3">
            <div className="nav-wrapper container">
                <a href="/dashboard" className="brand-logo center">
                    <i className="fa-solid fa-skull-crossbones"></i>InEdible
                </a>
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
    );
}
