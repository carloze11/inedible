const axios = require("axios");
const keys = require("../config/keys");

// Show search results from Spoonacular API
exports.productResults = async (req, res) => {
    try {
        if (!req.body.productSearch) {
            res.status(404);
        }
        let productSearch = req.body.productSearch.trim();
        const api_url = `https://api.spoonacular.com/food/products/search?query=${productSearch}&number=20&apiKey=${keys.spoonApiKey}`;
        const { data } = await axios.get(api_url);

        const results = {
            productSearch: productSearch,
            products: data.products,
            total: data.totalProducts,
            number: data.number,
        };

        res.status(200).json(results);
    } catch (err) {
        console.error(err);
        res.status(404);
    }
};

// Show specific product information
exports.productInfo = async (req, res) => {
    try {
        let productId = req.params.id;
        const api_url = `https://api.spoonacular.com/food/products/${productId}?apiKey=${process.env.SPOON_API_KEY}`;
        const data = await fetch(api_url);
        const json = await data.json();
        res.render("products/showProduct", {
            title: json.title,
            description: json.description,
            image: json.image,
        });
    } catch (err) {
        console.error(err);
        res.render("error/404");
    }
};
