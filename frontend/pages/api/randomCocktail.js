import axios from "axios";

async function randomCocktail() {
  try {
    const response = await axios.get(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );
    const recipe = response.data.drinks[0];
    console.log(recipe);
    return (await recipe);
  } catch (err) {
    console.error(err);
  };
};

export default randomCocktail;