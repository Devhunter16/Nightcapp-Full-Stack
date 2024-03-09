import axios from "axios";

const BACKEND_API_URL = "https://nightcapp-backend-1alguzldv-devhunter16s-projects.vercel.app/";

async function randomCocktail() {
  try {
    const response = await axios.get(`${BACKEND_API_URL}/cocktaildb/random_search`);
    const recipe = response.data;
    return (await recipe);
  } catch (err) {
    console.error(err);
  };
};

export default randomCocktail;