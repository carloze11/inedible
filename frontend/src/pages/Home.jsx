export default function Home() {
    const google = () => {
        window.open("http://localhost:3000/auth/google", "_self");
    };

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
                    <div className="section">
                        <a
                            href="/auth/google"
                            className="btn red darken-1"
                            onClick={google}
                        >
                            <i className="fab fa-google left"></i> Log In With
                            Google
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
