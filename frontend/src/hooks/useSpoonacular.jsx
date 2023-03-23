import { useState } from "react";

export const useSpoonacular = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [queryData, setQueryData] = useState(null);

    const searchSpoon = async (productSearch) => {
        setIsLoading(true);

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
            setQueryData(json);
            setIsLoading(false);
        }
    };
    return { searchSpoon, queryData, isLoading, error };
};
