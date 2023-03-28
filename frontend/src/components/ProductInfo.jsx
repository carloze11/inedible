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
        setPageScroll(true);
    }, [clicked, productId]);

    // useEffect(() => {
    //     // Disable/enable page scrolling when product info is displayed
    //     const body = document.querySelector("body");
    //     pageScroll ? disableScroll(body) : enableScroll(body);
    // }, [pageScroll]);

    return (
        <>
            {!isLoading && showProductInfo ? (
                <div className="info-card">
                    <div className="info-title">
                        <h6>{queryData.title}</h6>
                    </div>

                    <div className="info-img-div">
                        <img src={queryData.image} alt="" />
                    </div>
                    <div className="">
                        <h6>Product Details</h6>
                        <div className="info-desc">{queryData.description}</div>
                    </div>
                    <div className="info-ingredients">
                        <h6>Ingredients</h6>
                        <p>{queryData.ingredients}</p>
                    </div>
                    <div className="info-disclaimer">
                        <h6>Disclaimer</h6>
                        <p>
                            Actual product packaging and materials may contain
                            additional and/or different ingredient, nutritional,
                            or proper usage information than the information
                            displayed on our website. You are responsible for
                            reading labels, warnings, and directions prior to
                            using or consuming a product. If you have food
                            sensitivities or allergies, you should always read
                            the actual product labels to confirm the safety of
                            the product for your situation. Content on this
                            website is for general reference purposes only and
                            is not intended to substitute for advice by a
                            physician, pharmacist, or other licensed health care
                            professional. You should not use the information
                            presented on this website for self-diagnosis or for
                            treating a health problem. All products may not be
                            available in all stores. See your local store for
                            specific offerings. Kroger assumes no liability for
                            inaccuracies or misstatements regarding any product.
                        </p>
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
