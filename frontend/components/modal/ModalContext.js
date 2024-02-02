import { createContext, useContext, useState, useEffect } from 'react';

// Create the context
export const ModalContext = createContext();

// Create a provider component
export const ModalProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userStatus, setUserStatus] = useState(null);
    const [primaryMessage, setPrimaryMessage] = useState("");
    const [secondaryMessage, setSecondaryMessage] = useState("");

    useEffect(() => {
        if (userStatus === "loggedIn") {
            handleIsLoggedIn();
        } else if (userStatus === "loggedOut") {
            handleIsLoggedOut();
        } else if (userStatus === "registered") {
            handleInitialUserRegistration();
        } else if (userStatus === "duplicateUsername") {
            handleDuplicateUsername();
        } else if (userStatus === "invalidLogin") {
            handleInvalidLogin();
        } else if (userStatus === "favoritedRecipe") {
            handleAddNewFavorite();
        } else if (userStatus === "deletedRecipe") {
            handleDeleteFavorite();
        };
    }, [userStatus]);

    const handleDuplicateUsername = () => {
        setIsModalOpen(true);
        setPrimaryMessage("Whoops!");
        setSecondaryMessage("That username is already taken. Please try again.");
    };

    const handleInitialUserRegistration = () => {
        setIsModalOpen(true);
        setPrimaryMessage("Welcome!");
        setSecondaryMessage("You've been successfully registered. You may now log in.");
    };

    const handleIsLoggedIn = () => {
        setIsModalOpen(true);
        setPrimaryMessage("Welcome back!");
        setSecondaryMessage("You've been successfully logged in!");
    };

    const handleInvalidLogin = () => {
        setIsModalOpen(true);
        setPrimaryMessage("Whoops!");
        setSecondaryMessage("Invalid username or password. Please try again.");
    };

    const handleIsLoggedOut = () => {
        setIsModalOpen(true);
        setPrimaryMessage("Goodbye!");
        setSecondaryMessage("You've been successfully logged out!");
    };

    const handleAddNewFavorite = () => {
        setIsModalOpen(true);
        setPrimaryMessage("Success!");
        setSecondaryMessage("This recipe has been added to your favorites!");
    };

    const handleDeleteFavorite = () => {
        setIsModalOpen(true);
        setPrimaryMessage("Success!");
        setSecondaryMessage("This recipe has been deleted from your favorites!");
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setUserStatus(null);
        setIsModalOpen(false);
    };

    return (
        <ModalContext.Provider value={{
            isModalOpen,
            openModal,
            closeModal,
            setUserStatus,
            primaryMessage,
            secondaryMessage
        }}>
            {children}
        </ModalContext.Provider>
    );
};

// Custom hook to use the modal context
export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    };
    return context;
};