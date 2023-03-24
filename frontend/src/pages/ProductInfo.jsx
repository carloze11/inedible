import { useEffect, useState } from "react";
import { useSpoonacular } from "../hooks/useSpoonacular";

export default function ProductInfo({ productId }) {
    const { searchSpoon, queryData, isLoading } = useSpoonacular();
    const { product, setProduct } = useState(null);
    useEffect(async () => {
        await searchSpoon("products", "", productId);
        setProduct(queryData);
    }, []);
    const renderProduct = () => {
        return (
            <div className="row">
                <div className="col s12 m8">
                    <h3>{product.title}</h3>
                    <div>
                        <img src={product.image} alt="" />
                    </div>
                    <div className="card story">
                        <div className="card-content">
                            {/* <span className="card-title"> {{formatDate date ' MMMM Do YYYY, h:mm:ss a'}} </span>  */}
                            {product.description}
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    return <>{product ? renderProduct : "Still loading..."}</>;
}
