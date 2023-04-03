import { useState } from "react";

export const useFavoriteProducts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favoriteProducts, setFavoriteProducts] = useState(null);

    const getFavoriteProducts = async () => {
        setIsLoading(true);

        const response = await fetch(`/api/products/get-favorite-products`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });

        const json = await response.json();

        console.log(json);
        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }
        if (response.ok) {
            setFavoriteProducts(json);
            setIsLoading(false);
        }
    };
    return {
        getFavoriteProducts,
        favoriteProducts,
        isLoading,
        setIsLoading,
        error,
    };
};
