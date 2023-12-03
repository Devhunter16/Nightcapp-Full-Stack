// Function that finds all of the cocktail's ingredients and measurements and puts 
// them into an array
function matchIngredientsWithMeasurements(cocktailData) {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
        const ingredient = {};
        if (cocktailData[`strMeasure${i}`]) {
            ingredient.measurement = cocktailData[`strMeasure${i}`];
        };
        if (cocktailData[`strIngredient${i}`]) {
            ingredient.name = cocktailData[`strIngredient${i}`];
        };
        if (Object.keys(ingredient).length) {
            ingredients.push(ingredient);
        };
    };
    return ingredients;
};

export default matchIngredientsWithMeasurements;