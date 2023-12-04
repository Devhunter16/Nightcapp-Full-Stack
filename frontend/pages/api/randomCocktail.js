import axios from "axios";

const BACKEND_API_URL = "http://localhost:3002";

async function randomCocktail() {
  try {
    const response = await axios.get(`${BACKEND_API_URL}/random_search`);
    const recipe = response.data;
    return (await recipe);
  } catch (err) {
    console.error(err);
  };
};

export default randomCocktail;