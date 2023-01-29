export default function Navbar() {
    return (
        <nav class="grey darken-3">
            <div class="nav-wrapper container">
                <a href="#!" class="brand-logo center">
                    <i class="fa-solid fa-skull-crossbones"></i>InEdible
                </a>
                <a
                    href="#"
                    data-target="mobile-demo"
                    class="sidenav-trigger show-on-large"
                >
                    <i class="fas fa-bars"></i>
                </a>
                <ul class="sidenav" id="mobile-demo">
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
