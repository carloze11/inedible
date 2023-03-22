import { useState } from "react";

export const useSpoonacular = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchSpoon = async (productSearch) => {
        const response = await fetch("/api/products/results", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productSearch }),
        });

        const json = await response.json();
        console.log(json);

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }
        if (response.ok) {
            setIsLoading(false);
        }
    };
    return { searchSpoon, isLoading, error };
};
