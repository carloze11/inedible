import Login from "./Login";

export default function Home() {
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
                            allergies or intolerances.
                        </p>
                    </div>
                    <div className="divider"></div>
                    <div className="section"></div>
                </div>
            </div>
        </div>
    );
}
