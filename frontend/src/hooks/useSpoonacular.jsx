import { useState } from "react";

export const useSpoonacular = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [queryData, setQueryData] = useState(null);

    const searchSpoon = async (type, querySearch = "", id = "") => {
        setIsLoading(true);

        const response = await fetch(`/api/${type}/results/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ querySearch }),
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
