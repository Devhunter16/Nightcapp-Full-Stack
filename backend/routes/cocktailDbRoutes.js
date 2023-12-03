const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/search_by_name", async (req, res, next) => {
    const { name } = req.query;
    if (!name) {
        console.log("No cocktail name input");
        // return next(new BadRequestError("You must provide a cocktail name to search."));
    };
    try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
        return res.json(response.data);
    } catch (err) {
        console.error(err);
        // return next(new NotFoundError("Cocktails not found."));
    };
});

router.get("/search_by_ingredient", async (req, res, next) => {
    const { ingredient } = req.query;
    if (!ingredient) {
        console.log("No cocktail ingredient input");
        // return next(new BadRequestError("You must provide a cocktail name to search."));
    };
    try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        return res.json(response.data);
    } catch (err) {
        console.error(err);
        // return next(new NotFoundError("Cocktails not found."));
    };
});

// Need this export or Router.use() will complain that it is expecting a middleware 
// function but is recieving an object
module.exports = router;