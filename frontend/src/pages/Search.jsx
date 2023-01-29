export default function Search() {
    return (
        <div>
            <h1 className="center-align">
                Search for food using the Spoonacular API!
            </h1>
            <form action="/products/results" method="POST">
                <div className="row">
                    <label htmlFor="productSearch">Search</label>
                    <input
                        type="text"
                        name="productSearch"
                        id="productSearch"
                        required
                    />
                    <input type="submit" className="btn" />
                </div>
            </form>
        </div>
    );
}
