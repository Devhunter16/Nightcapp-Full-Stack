import styles from "./SearchForm.module.css";

import { useState } from "react";
import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice } from "@fortawesome/free-solid-svg-icons";

import { searchCocktailByName, searchCocktailByIngredient } from "../../pages/api/searchCocktail";
import randomCocktail from "../../pages/api/randomCocktail";

function SearchForm() {
    const [searchByName, setSearchByName] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let results = {};
        setAlert(false); // Reset the alert state
        setLoading(true); // Set loading state to true when starting the search
        // Prevents users from searching if the search field is empty
        if (searchTerm.trim() === "") {
            setAlert(true);
            setLoading(false);
            return;
        };
        if (searchByName) {
            results = await searchCocktailByName(searchTerm);
        } else if (!searchByName) {
            results = await searchCocktailByIngredient(searchTerm);
        };
        setLoading(false);
        setSearchTerm("");
        if (results === undefined) {
            setAlert(true);
            console.log("No data");
        } else {
            if (searchByName) {
                results = await searchCocktailByName(searchTerm);
                // Pushing the search type through to the page and setting the route
                router.push({
                    pathname: `/drinks/${searchTerm}`,
                    query: {
                        drinks: JSON.stringify(results),
                        searchType: "name", // Indicator for search by name
                        searchTerm: searchTerm
                    },
                });
            } else {
                results = await searchCocktailByIngredient(searchTerm);
                // Pushing the search type through to the page and setting the route
                router.push({
                    pathname: `/drinks/${searchTerm}`,
                    query: {
                        drinks: JSON.stringify(results),
                        searchType: "ingredient" // Indicator for search by ingredient
                    },
                });
            };
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
                        id={`${alert ? styles.alertInput : styles.input}`}
                        type="text"
                        value={searchTerm}
                        placeholder={alert ? "No results found" : undefined}
                        onClick={handleCloseAlert}
                        onChange={handleChange}
                    />
                    <button
                        className={`${styles.btn} ${loading ? styles.loadingBtn : ''}`}
                        onClick={handleSubmit}
                    >
                        {loading ? "Searching..." : "Search"}
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
        </>
    );
};

export default SearchForm;