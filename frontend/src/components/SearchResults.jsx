import { useState, useEffect } from "react";
import he from "he";

import ProductInfo from "./ProductInfo";
import { disableScroll, enableScroll } from "../utils/toggleScrolling";

export default function SearchResults({ queryData }) {
    const [productId, setProductId] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [showProductInfo, setShowProductInfo] = useState(false);
    const [pageScroll, setPageScroll] = useState(true);
    const { productSearch, products, total, number } = queryData;

    // Disable/enable page scrolling when product info is displayed
    useEffect(() => {
        const body = document.querySelector("body");
        !pageScroll ? disableScroll(body) : enableScroll(body);
    }, [pageScroll]);

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
                                    <button className="btn heart-btn">
                                        <i class="fas fa-heart"></i>
                                    </button>
                                    <button
                                        className="btn"
                                        onClick={() => {
                                            setProductId(product.id);
                                            setShowProductInfo(true);
                                            setClicked(true);
                                        }}
                                    >
                                        Info
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
                    pageScroll={pageScroll}
                    setPageScroll={setPageScroll}
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
