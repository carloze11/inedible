import React from "react";
import Main from "../components/Main";

export default function Results({ productSearch, products, total, number }) {
    return (
        <Main>
            <form action="/products/results" method="POST">
                <div className="row">
                    <label htmlFor="productSearch">Search</label>
                    <input
                        type="text"
                        name="productSearch"
                        id="productSearch"
                        defaultValue={productSearch}
                    />
                    <input type="submit" className="btn" />
                </div>
            </form>

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
        </Main>
    );
}
