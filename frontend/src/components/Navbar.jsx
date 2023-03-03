import M from "materialize-css";
import { useEffect } from "react";

export default function Navbar() {
    useEffect(() => {
        M.AutoInit();
    }, []);

    return (
        <nav className="grey darken-3">
            <div className="nav-wrapper container">
                <a href="#!" className="brand-logo center">
                    <i className="fa-solid fa-skull-crossbones"></i>InEdible
                </a>
                <a
                    href="#"
                    data-target="mobile-demo"
                    className="sidenav-trigger show-on-large"
                >
                    <i className="fas fa-bars"></i>
                </a>
                <ul id="mobile-demo" className="sidenav">
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
