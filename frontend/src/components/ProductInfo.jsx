import { useEffect, useState } from "react";
import { useSpoonacular } from "../hooks/useSpoonacular";

export default function ProductInfo({ productId }) {
    const { searchSpoon, queryData, isLoading } = useSpoonacular();
    useEffect(() => {
        searchSpoon("products", "", productId);
    }, []);

    return (
        <>
            {queryData ? (
                <div className="row">
                    <div className="col s12 m8">
                        <h3>{queryData.title}</h3>
                        <div>
                            <img src={queryData.image} alt="" />
                        </div>
                        <div className="card story">
                            <div className="card-content">
                                {/* <span className="card-title"> {{formatDate date ' MMMM Do YYYY, h:mm:ss a'}} </span>  */}
                                {queryData.description}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                "Still loading..."
            )}
        </>
    );
}
