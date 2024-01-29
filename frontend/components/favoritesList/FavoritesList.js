import styles from "./FavoritesList.module.css";

import RecipeCard from "../recipeCard/RecipeCard";

function FavoritesList(props) {

    return (
        <ul id={styles.ul}>
            <div id={styles.row}>
                {props.favorites.map((favorite) => (
                    <div onClick={() => props.handleShowFavorites(favorite)}>
                        <RecipeCard
                            key={favorite.idDrink}
                            id={favorite.idDrink}
                            name={favorite.strDrink}
                            image={favorite.strDrinkThumb}
                            ingredients={favorite.ingredientsList}
                        />
                    </div>
                ))}
            </div>
        </ul>
    );
};

export default FavoritesList;
