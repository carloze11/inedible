// Render search page for Spoonacular grocery products
exports.getSearch = async (req, res) => {
    res.render("products/search");
};

// Show search results from Spoonacular API
exports.postResults = async (req, res) => {
    try {
        let productSearch = req.body.productSearch;
        const api_url = `https://api.spoonacular.com/food/products/search?query=${productSearch}&number=100&apiKey=${process.env.SPOON_API_KEY}`;
        const data = await fetch(api_url);
        const json = await data.json();
        res.render("products/results", {
            productSearch: productSearch,
            products: json.products,
            total: json.totalProducts,
            number: json.number,
        });
    } catch (err) {
        console.error(err);
        res.render("/error/404");
    }
};

// Show specific product information
exports.getProduct = async (req, res) => {
    try {
        let productId = req.params.id;
        const api_url = `https://api.spoonacular.com/food/products/${productId}?apiKey=${process.env.SPOON_API_KEY}`;
        const data = await fetch(api_url);
        const json = await data.json();
        res.render("products/show-product", {
            title: json.title,
            description: json.description,
            image: json.image,
        });
    } catch (err) {
        console.error(err);
        res.render("error/404");
    }
};
