import { Link } from "react-router-dom";

export default function Error404() {
    return (
        <div>
            <h1>404 Not Found</h1>
            <p>We're sorry, this page is not a page.</p>
            <Link href="/dashboard" class="btn">
                Go to Dashboard
            </Link>
        </div>
    );
}
