const axios = require("axios");
const keys = require("../config/keys");
const he = require("he");

const User = require("../models/User");
const FavoriteProducts = require("../models/FavoriteProducts");

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
        const sanitizedTitle = he.decode(data.title);
        const description = data.description;
        const sanitizedDescription = he
            .decode(description)
            .replace(/<\/?[^>]+>/g, "")
            .split("  ")
            .filter((el) => el !== "")
            .join(". ")
            .replace(/Â/g, "")
            .replace(/\(at\)/g, "@");

        const ingredients = data.ingredients
            .map((ingredient) => {
                return ingredient.name;
            })
            .join(", ");

        const results = {
            title: sanitizedTitle,
            image: data.image,
            description: sanitizedDescription,
            ingredients: ingredients,
        };

        res.status(200).json(results);
    } catch (err) {
        console.error(err);
        res.status(404);
    }
};

exports.getFavoriteProducts = async (req, res) => {
    try {
        const favoriteProducts = await FavoriteProducts.find()
            .populate("user")
            .sort({ productName: "asc" })
            .lean();

        res.status(200).json(favoriteProducts);
    } catch (err) {
        console.error(err);
        res.status(404);
    }
};
