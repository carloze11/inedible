import React from "react";
import Main from "../components/Main";

export default function Error404() {
    return (
        <Main>
            <h1>404 Not Found</h1>
            <p>We're sorry, this page is not page.</p>
            <a href="/dashboard" class="btn">
                Go to Dashboard
            </a>
        </Main>
    );
}
