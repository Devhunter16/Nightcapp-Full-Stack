import styles from "./SearchForm.module.css";

import { useState } from "react";
import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice } from "@fortawesome/free-solid-svg-icons";

import { searchCocktailByName, searchCocktailByIngredient } from "../../pages/api/searchCocktail";
import Alert from "../alert/AlertModal";
import randomCocktail from "../../pages/api/randomCocktail";

function SearchForm() {
    const [searchByName, setSearchByName] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [alert, setAlert] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let results = {};
        setAlert(false); // Reset the alert state
        // Prevents users from searching if the search field is empty
        if (searchTerm.trim() === "") {
            setAlert(true);
            return;
        };
        if (searchByName == true) {
            results = await searchCocktailByName(searchTerm);
            console.log(results);
        } else if (searchByName == false) {
            results = await searchCocktailByIngredient(searchTerm);
        };
        setSearchTerm("");
        if (results == undefined) {
            console.log("No data");
        } else {
            // Pushing variables through to page and setting the route
            router.push({
                pathname: `/drinks/${searchTerm}`,
                query: {
                    drinks: JSON.stringify(results),
                },
            });
        };
    };

    const handleCloseAlert = () => {
        setAlert(false);
    };

    // Toggles between searching by name or ingredient
    const toggleSearchType = () => {
        setSearchByName((prevSearchByName) => !prevSearchByName);
    };

    const handleShowDrinkRecipe = (result) => {
        // Pushing variables through to page and setting the route, must convert the JS
        // object to a JSON string in order to send the data
        router.push({
            pathname: `/drink/${result.idDrink}`,
            query: {
                drink: JSON.stringify(result),
            },
        });
    };

    const handleShowRandomCocktailRecipe = async (event) => {
        event.preventDefault(); // Allows us to handle the form submission manually
        try {
            const data = await randomCocktail();
            if (data && data.idDrink) {
                handleShowDrinkRecipe(data);
            } else {
                console.error("Invalid random cocktail data");
            }
        } catch (error) {
            console.error("Error fetching random cocktail data", error);
        };
    };

    return (
        <>
            <div id={styles.form}>
                <div className={styles.option}>
                    Cocktail
                    {searchByName ? (
                        <span onClick={toggleSearchType}>Name:</span>
                    ) : (
                        <span onClick={toggleSearchType}>Ingredient:</span>
                    )}
                </div>
                <form>
                    <input
                        id={styles.input}
                        type="text"
                        value={searchTerm}
                        onChange={handleChange}
                    />
                    <button
                        className={styles.btn}
                        onClick={handleSubmit}
                    >
                        Search
                    </button>
                    <button
                        className={styles.btn}
                        onClick={
                            handleShowRandomCocktailRecipe
                        }
                    >
                        <FontAwesomeIcon id={styles.dice} icon={faDice} />
                        Random
                    </button>
                </form>
            </div>
            {alert && <Alert
                primaryMessage={"Whoops!"}
                secondaryMessage={"Looks like you left the search blank, enter some text to search!"}
                close={handleCloseAlert}
            />}
        </>
    );
};

export default SearchForm;