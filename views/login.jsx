export default function Login() {
    return (
        <>
            <head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
                />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
                    integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                />
                <link rel="stylesheet" href="/styles.css" />
                <script
                    defer
                    src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"
                ></script>

                <title>InEdible</title>
            </head>

            <body>
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
                                    users steer clear of any foods that may
                                    trigger their food allergies or
                                    intolerances.{" "}
                                </p>
                            </div>
                            <div className="divider"></div>
                            <div className="section">
                                <a
                                    href="/auth/google"
                                    className="btn red darken-1"
                                >
                                    <i className="fab fa-google left"></i> Log
                                    In With Google
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </>
    );
}
