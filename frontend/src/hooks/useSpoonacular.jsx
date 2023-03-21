export const useSpoonacular = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchSpoon = async (product) => {
        const response = await fetch("/api/products/results", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ product }),
        });

        const json = await json.response();

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
