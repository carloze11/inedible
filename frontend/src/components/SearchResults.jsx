export default function SearchResults({ queryData }) {
    const { productSearch, products, total, number } = queryData;
    return (
        <div>
            <h5>
                '{total}' search results found for '{productSearch}'...
            </h5>

            <div className="results-container">
                {products.map((product) => {
                    return (
                        <div className="col s12 m4">
                            <div className="card">
                                <div className="card-content center-align col">
                                    <h6>{product.title}</h6>
                                    <img src={product.image} alt="" />
                                </div>
                                <div className="card-action center-align">
                                    <a
                                        href={`/products/results/${product.id}`}
                                        className="btn grey"
                                    >
                                        See More
                                    </a>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="card-action center-align">
                <form action="/products/results" method="POST">
                    <input
                        type="text"
                        name="productSearch"
                        id="productSearch"
                        defaultValue={productSearch}
                        hidden
                    />
                    <button
                        type="submit"
                        className="btn grey"
                        name="showMore"
                        value="10"
                    >
                        Show More
                    </button>
                </form>
            </div>
        </div>
    );
}
