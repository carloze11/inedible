import M from "materialize-css";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ user }) {
    const sidenavRef = useRef(null);

    useEffect(() => {
        M.Sidenav.init(sidenavRef.current);
    }, []);

    const closeSidenav = () => {
        const sidenavInstance = M.Sidenav.getInstance(sidenavRef.current);
        sidenavInstance.close();
    };

    return (
        <nav className="grey darken-3">
            {!user ? (
                <div>
                    <Link
                        to="/"
                        className="brand-logo center"
                        onClick={closeSidenav}
                    >
                        <i className="fa-solid fa-skull-crossbones"></i>InEdible
                    </Link>
                </div>
            ) : (
                <div className="nav-wrapper container">
                    <Link
                        to="/"
                        className="brand-logo center"
                        onClick={closeSidenav}
                    >
                        <i className="fa-solid fa-skull-crossbones"></i>InEdible
                    </Link>
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
                            <Link to="/foods" onClick={closeSidenav}>
                                Community Food
                            </Link>
                        </li>
                        <li>
                            <Link to="/products/search" onClick={closeSidenav}>
                                Search Products
                            </Link>
                        </li>
                        <li>
                            <a href="/auth/logout" onClick={closeSidenav}>
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}
