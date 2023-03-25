const axios = require("axios");
const keys = require("../config/keys");
const he = require("he");

// Show search results from Spoonacular API
exports.productResults = async (req, res) => {
    try {
        if (!req.body.querySearch) {
            res.status(404);
        }
        let productSearch = req.body.querySearch.trim();
        const api_url = `https://api.spoonacular.com/food/products/search?query=${productSearch}&number=21&sort=popularity-desc&apiKey=${keys.spoonApiKey}`;
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
        const api_url = `https://api.spoonacular.com/food/products/${productId}?apiKey=${keys.spoonApiKey}`;
        const { data } = await axios.get(api_url);
        const sanitizedDescription = he
            .decode(data.description)
            .replace(/Â/g, "")
            .replace(/\(at\)/g, "@");

        const results = {
            title: data.title,
            description: sanitizedDescription,
            image: data.image,
        };

        res.status(200).json(results);
    } catch (err) {
        console.error(err);
        res.status(404);
    }
};
