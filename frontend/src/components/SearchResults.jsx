import { useState } from "react";
import he from "he";

import ProductInfo from "./ProductInfo";

export default function SearchResults({ queryData }) {
    const [productId, setProductId] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [showProductInfo, setShowProductInfo] = useState(false);
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
                                    {he.decode(product.title)}
                                </span>
                                <div className="card-action">
                                    <button
                                        className="btn"
                                        onClick={() => {
                                            setProductId(product.id);
                                            setShowProductInfo(true);
                                            setClicked(true);
                                        }}
                                    >
                                        See More
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {productId ? (
                <ProductInfo
                    productId={productId}
                    showProductInfo={showProductInfo}
                    setShowProductInfo={setShowProductInfo}
                    clicked={clicked}
                    setClicked={setClicked}
                />
            ) : (
                <> </>
            )}
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
