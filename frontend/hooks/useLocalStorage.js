import { useState, useEffect } from "react";

/** This hook provides a way to synchronize a state variable in a React component 
 * with a value stored in the browser's localStorage. It handles reading the 
 * initial value from localStorage, updating localStorage when the value changes, 
 * and providing a straightforward interface for components to use this feature. 
 */

function useLocalStorage(key, firstvalue = null) {
    // Checks if the code is running in a browser environment by verifying if the 
    // window object exists. Checking this because we want to use localStorage,
    // which is a browser-specific storage mechanism
    const isClient = typeof window === "object";

    // If the code is running in a browser environment, retrieve a value ("key") 
    // from localStorage
    const initialValue = isClient
        ? localStorage.getItem(key) || firstvalue
        : firstvalue;

    // Store the retrieved value in "item"
    const [item, setItem] = useState(initialValue);

    // Update localStorage whenever "item" changes
    useEffect(
        function setKeyInLocalStorage() {
            if (item === null) {
                localStorage.removeItem(key);
            } else {
                localStorage.setItem(key, item);
            };
            console.log("item value inside userLocalStorage hook:", item);
        },
        [key, item]
    );

    // The hook returns an array containing the current item value and the setItem
    // function to update it
    return [item, setItem];
};

export default useLocalStorage;