import React from "react";
import Main from "../components/Main";

export default function Error500() {
    return (
        <Main>
            <h1>Server Error</h1>
            <p>We're sorry, something went wrong.</p>
            <a href="/dashboard" class="btn">
                Go to Dashboard
            </a>
        </Main>
    );
}
