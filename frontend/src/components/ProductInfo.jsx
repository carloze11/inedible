import { useEffect, useState } from "react";

import { useSpoonacular } from "../hooks/useSpoonacular";
import { disableScroll, enableScroll } from "../utils/toggleScrolling";

export default function ProductInfo({
    productId,
    showProductInfo,
    setShowProductInfo,
    clicked,
    setClicked,
}) {
    const [pageScroll, setPageScroll] = useState(false);
    const { searchSpoon, queryData, isLoading, setIsLoading } =
        useSpoonacular();

    // Search for a specific product's info using Spoonacular hook
    useEffect(() => {
        searchSpoon("products", "", productId);

        // Disable/enable page scrolling when product info is displayed
        const body = document.querySelector("body");
        pageScroll ? disableScroll(body) : enableScroll(body);

        setPageScroll(true);
    }, [clicked, productId, pageScroll]);

    return (
        <>
            {!isLoading && showProductInfo ? (
                <div className="info-card">
                    <h6>{queryData.title}</h6>
                    <div className="info-img-div">
                        <img src={queryData.image} alt="" />
                    </div>
                    <div className="">
                        <h6>Product Details</h6>
                        <div
                            className="info-desc"
                            dangerouslySetInnerHTML={{
                                __html: queryData.description,
                            }}
                        ></div>
                    </div>
                    <div>
                        <h6>Ingredients</h6>
                    </div>
                    <div>
                        <h6>Allergen Info</h6>
                    </div>
                    <div className="info-btn-div">
                        <button className="btn info-btn">Save</button>
                        <button
                            className="btn red dark-3 info-btn"
                            onClick={() => {
                                setPageScroll(false);
                                setIsLoading(true);
                                setShowProductInfo(false);
                                setClicked(false);
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            ) : (
                "Still loading..."
            )}
        </>
    );
}
