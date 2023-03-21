import M from "materialize-css";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import useLogout from "../hooks/useLogout";

export default function Navbar({ user }) {
    const { logout } = useLogout();
    const sidenavRef = useRef(null);

    useEffect(() => {
        M.Sidenav.init(sidenavRef.current);
    }, [user]);

    const closeSidenav = () => {
        const sidenavInstance = M.Sidenav.getInstance(sidenavRef.current);
        sidenavInstance.close();
    };

    const renderMenu = () => {
        return (
            <>
                <a
                    href="#"
                    data-target="mobile-demo"
                    className="sidenav-trigger show-on-large"
                >
                    <i className="fas fa-bars"></i>
                </a>
                <ul id="mobile-demo" className="sidenav" ref={sidenavRef}>
                    <li>
                        <Link to="/dashboard" onClick={closeSidenav}>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/products/search" onClick={closeSidenav}>
                            Search Products
                        </Link>
                    </li>
                    <li>
                        <Link to="/account" onClick={closeSidenav}>
                            My Account
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/"
                            onClick={() => {
                                logout();
                                closeSidenav();
                            }}
                        >
                            Logout
                        </Link>
                    </li>
                </ul>
            </>
        );
    };

    return (
        <nav className="grey darken-3">
            <div className="nav-wrapper container">
                <Link
                    to="/"
                    className="brand-logo center"
                    onClick={closeSidenav}
                >
                    <i className="fa-solid fa-skull-crossbones"></i>
                    InEdible
                </Link>
                {user ? renderMenu() : <></>}
            </div>
        </nav>
    );
}
