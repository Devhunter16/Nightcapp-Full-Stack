import styles from "./DrinksList.module.css";

import RecipeCard from "../recipeCard/RecipeCard";

function DrinksList(props) {
    return (
        <ul id={styles.ul}>
            <div id={styles.row}>
                {props.results.map((result) => (
                    <div onClick={() => props.handleShowDrinkRecipe(result)}>
                        <RecipeCard
                            key={result.idDrink}
                            id={result.idDrink}
                            name={result.strDrink}
                            image={result.strDrinkThumb}
                            ingredients={result.ingredientsList}
                        />
                    </div>
                ))}
            </div>
        </ul>
    );
};

export default DrinksList;
