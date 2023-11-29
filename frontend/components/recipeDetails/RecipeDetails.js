import styles from "./RecipeDetails.module.css";

function RecipeDetails(props) {
    return (
        <>
            <div id={styles.body}>
                <img className={styles.img} src={props.image}></img>
                <div id={styles.description}>
                    <h1 id={styles.drinkTitle}>{props.name}</h1>
                    <h3 id={styles.ingredientsTitle}>Ingredients</h3>
                    <ul>
                        <div>
                            {props.ingredientsList &&
                                props.ingredientsList.map((ingredient) => (
                                    <li id={styles.ingredient}>
                                        {ingredient.name} -{" "}
                                        <span id={styles.measurements}>
                                            {ingredient.measurement}
                                        </span>
                                    </li>
                                ))}
                        </div>
                    </ul>
                    <h3 id={styles.directionsTitle}>Directions</h3>
                    <p id={styles.drinkDescription}>{props.instructions}</p>
                </div>
            </div>
        </>
    );
};

export default RecipeDetails;