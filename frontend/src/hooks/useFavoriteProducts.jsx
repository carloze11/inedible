import { useState } from "react";

export const useFavoriteProducts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favProducts, setFavProducts] = useState(null);

    const getFavoriteProducts = async () => {
        setIsLoading(true);

        const response = await fetch(`/api/products/get-favorite-products`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }
        if (response.ok) {
            setFavProducts(json);
            setIsLoading(false);
        }
    };
    return { getFavoriteProducts, favProducts, isLoading, setIsLoading, error };
};
