import { useState } from "react";

import ProductInfo from "./ProductInfo";

export default function SearchResults({ queryData }) {
    const [productId, setProductId] = useState(false);
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
                                <span
                                    className="card-title"
                                    style={{ textAlign: "center" }}
                                >
                                    {product.title}
                                </span>
                                <div className="card-action">
                                    <button
                                        className="btn"
                                        onClick={() => setProductId(product.id)}
                                    >
                                        See More
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {productId ? <ProductInfo productId={productId} /> : <> </>}
            <div className="col s12 center">
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
