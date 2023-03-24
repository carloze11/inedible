export default function SearchResults({ queryData }) {
    const { productSearch, products, total, number } = queryData;
    return (
        <div>
            <h5>
                '{total}' search results found for '{productSearch}'...
            </h5>

            <div className="row">
                {products.map((product) => (
                    <div className="col s12 m4" key={product.id}>
                        <div className="card">
                            <div className="card-image">
                                <img
                                    src={product.image}
                                    alt=""
                                    className="responsive-img"
                                />
                            </div>
                            <div className="card-content">
                                <span className="card-title">
                                    {product.title}
                                </span>
                                <div className="card-action">
                                    <a href={`/products/results/${product.id}`}>
                                        See More
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="col s12">
                <button
                    type="submit"
                    className="btn grey"
                    name="showMore"
                    value="10"
                >
                    Show More
                </button>
            </div>
        </div>
    );
}
