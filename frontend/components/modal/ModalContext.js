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
        } else if (userStatus === "initiallyRegistered") {
            handleInitialUserRegistration();
        };
    }, [userStatus]);

    const handleInitialUserRegistration = () => {
        setUserStatus("initiallyRegistered");
        setIsModalOpen(true);
        setPrimaryMessage("Welcome in!");
        setSecondaryMessage("You've been successfully registered!");
    };

    const handleIsLoggedIn = () => {
        setUserStatus("loggedIn");
        setIsModalOpen(true);
        setPrimaryMessage("Welcome back!");
        setSecondaryMessage("You've been successfully logged in!");
    };

    const handleIsLoggedOut = () => {
        setUserStatus("loggedOut");
        setIsModalOpen(true);
        setPrimaryMessage("Goodbye!");
        setSecondaryMessage("You've been successfully logged Out!");
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
    }
    return context;
};