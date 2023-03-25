import { useEffect, useState } from "react";
import { useSpoonacular } from "../hooks/useSpoonacular";

import { disableScroll, enableScroll } from "../utils/toggleScrolling";

export default function ProductInfo({ productId }) {
    const [pageScroll, setPageScroll] = useState(false);
    const { searchSpoon, queryData, isLoading, setIsLoading } =
        useSpoonacular();
    useEffect(() => {
        searchSpoon("products", "", productId);
        setPageScroll(true);
    }, [productId]);

    useEffect(() => {
        const body = document.querySelector("body");

        pageScroll ? disableScroll() : enableScroll();
    }, [pageScroll]);
    return (
        <>
            {!isLoading ? (
                <div className="info-card">
                    <div className="col s12 m8">
                        <h6>{queryData.title}</h6>
                        <div>
                            <img src={queryData.image} alt="" />
                        </div>
                        <div className="card story">
                            <div className="card-content">
                                {/* <span className="card-title"> {{formatDate date ' MMMM Do YYYY, h:mm:ss a'}} </span>  */}
                                {queryData.description}
                            </div>
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
