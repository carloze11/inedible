import React from "react";
import Navbar from "./Navbar";
import AddBtn from "./AddBtn";

export default function Main(props) {
    return (
        <>
            <html lang="en">
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
                    <title>InEdible</title>
                </head>

                <body>
                    <Navbar />
                    <AddBtn />
                    <div className="container">{props.children}</div>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
                    <script
                        src="https://cdnjs.cloudflare.com/ajax/libs/ckeditor/4.20.0/ckeditor.js"
                        integrity="sha512-BcYkQlDTKkWL0Unn6RhsIyd2TMm3CcaPf0Aw1vsV28Dj4tpodobCPiriytfnnndBmiqnbpi2EelwYHHATr04Kg=="
                        crossOrigin="anonymous"
                        referrerPolicy="no-referrer"
                    ></script>
                    <script>
                        M.Sidenav.init(document.querySelector('.sidenav'))
                    </script>
                    <script>
                        M.FormSelect.init(document.querySelector('#foodCategory'))
                    </script>

                    {/* <script>CKEDITOR.replace('ingredients', {plugins: 'wysiwygarea, toolbar, basicstyles, link'})</script> */}
                </body>
            </html>
        </>
    );
}
