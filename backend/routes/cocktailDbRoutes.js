const express = require("express");
const router = express.Router();
const axios = require("axios");
const { NotFoundError, BadRequestError } = require("../expressError");

router.get("/search_by_name", async (req, res, next) => {
    const { name } = req.query;
    if (!name) {
        return next(new BadRequestError("You must provide a cocktail name to search."));
    };
    try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
        return res.json(response.data);
    } catch (err) {
        return next(new NotFoundError("No cocktails found under that name."));
    };
});

router.get("/search_by_ingredient", async (req, res, next) => {
    const { ingredient } = req.query;
    if (!ingredient) {
        return next(new BadRequestError("You must provide a cocktail ingredient to search."));
    };
    try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        return res.json(response.data);
    } catch (err) {
        console.error(err);
        return next(new NotFoundError("No cocktails found with that ingredient."));
    };
});

router.get("/random_search", async (req, res, next) => {
    try {
        const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
        return res.json(response.data.drinks[0]);
    } catch (err) {
        console.error(err);
        return next(new NotFoundError("No cocktails found."));
    };
});

// Need this export or Router.use() will complain that it is expecting a middleware 
// function but is recieving an object
module.exports = router;