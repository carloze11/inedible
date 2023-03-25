import { useEffect, useState } from "react";

import { useSpoonacular } from "../hooks/useSpoonacular";
import { disableScroll, enableScroll } from "../utils/toggleScrolling";

export default function ProductInfo({ productId }) {
    const [pageScroll, setPageScroll] = useState(false);
    const { searchSpoon, queryData, isLoading, setIsLoading } =
        useSpoonacular();

    // Search for a specific product's info using Spoonacular hook
    useEffect(() => {
        searchSpoon("products", "", productId);
        setPageScroll(true);
    }, [productId]);

    // Disable/enable page scrolling when product info is displayed
    useEffect(() => {
        const body = document.querySelector("body");
        pageScroll ? disableScroll(body) : enableScroll(body);
    }, [pageScroll]);

    return (
        <>
            {!isLoading ? (
                <div className="info-card">
                    <div className="">
                        <h6>{queryData.title}</h6>
                        <div>
                            <img src={queryData.image} alt="" />
                        </div>
                        <div className="">
                            <div
                                className=""
                                dangerouslySetInnerHTML={{
                                    __html: queryData.description,
                                }}
                            ></div>
                        </div>
                        <button
                            className="btn red dark-3"
                            onClick={() => {
                                setIsLoading(true);
                                setPageScroll(false);
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
