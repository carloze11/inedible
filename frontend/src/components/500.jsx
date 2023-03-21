import { Link } from "react-router-dom";

export default function Error500() {
    return (
        <div>
            <h1>Server Error</h1>
            <p>We're sorry, something went wrong.</p>
            <Link to="/dashboard" class="btn">
                Go to Dashboard
            </Link>
        </div>
    );
}
