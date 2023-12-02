const express = require("express");
const router = express.Router();
const axios = require("axios");

console.log("Route file is being executed");

router.get("/search", async (req, res, next) => {
    const { recipe } = req.query;
    console.log("Searching by name:", recipe);

    if (!recipe) {
        console.log("No recipe input");
        // return next(new BadRequestError("You must provide a cocktail name to search."));
    };

    try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${recipe}`);
        console.log("CocktailDB response:", response.data);
        return res.json(response.data);
    } catch (err) {
        console.error(err);
        // return next(new NotFoundError("Cocktails not found."));
    };
});

// Need this export or Router.use() will complain that it is expecting a middleware 
// function but is recieving an object
module.exports = router;