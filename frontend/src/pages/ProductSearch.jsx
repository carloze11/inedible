import { useState } from "react";
import { useSpoonacular } from "../hooks/useSpoonacular";
import SearchResults from "../components/SearchResults";

const ProductSearch = () => {
    const [query, setQuery] = useState("");
    const { searchSpoon, queryData, isLoading } = useSpoonacular();

    const handleSubmit = async (e) => {
        e.preventDefault();
        searchSpoon("products", query);
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="searchbar">
                    <input
                        type="text"
                        name="productSearch"
                        id="productSearch"
                        placeholder="Search Products"
                        onChange={(e) => setQuery(e.target.value)}
                        required
                    />
                    <input type="submit" className="btn" />
                </div>
            </form>
            {!isLoading && <SearchResults queryData={queryData} />}
        </div>
    );
};

export default ProductSearch;
