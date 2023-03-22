import { useState } from "react";
import { useSpoonacular } from "../hooks/useSpoonacular";

const ProductSearch = () => {
    const [query, setQuery] = useState("");
    const { searchSpoon } = useSpoonacular();

    const handleSubmit = async (e) => {
        e.preventDefault();
        searchSpoon(query);
    };

    return (
        <div className="container">
            <h1 className="center-align">
                Search for food using the Spoonacular API!
            </h1>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="productSearch">Search</label>
                    <input
                        type="text"
                        name="productSearch"
                        id="productSearch"
                        onChange={(e) => setQuery(e.target.value)}
                        required
                    />
                    <input type="submit" className="btn" />
                </div>
            </form>
        </div>
    );
};

export default ProductSearch;
