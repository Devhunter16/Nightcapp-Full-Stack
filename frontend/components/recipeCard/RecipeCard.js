import styles from "./RecipeCard.module.css";

import { BiDrink } from "react-icons/bi";

function RecipeCard({ name, image, ingredients }) {
    return (
        <div className={styles.container}>
            <div className={styles.cardContainer}>
                <h3 className={styles.cocktailName}>{name}</h3>
                <img src={image} className={styles.cardImage} />
                <div id={styles.ingredientsBox}>
                    <div className={styles.ingredientsTitle}>
                        <BiDrink className={styles.icon} />
                        <h2>Ingredients</h2>
                    </div>
                    <hr className={styles.titleUnderline}></hr>
                    <ul>
                        {ingredients.map((ingredient) => (
                            <li className={styles.recipeIngredient}>
                                {ingredient.name} -
                                <span id={styles.measurement}>
                                    {ingredient.measurement}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;