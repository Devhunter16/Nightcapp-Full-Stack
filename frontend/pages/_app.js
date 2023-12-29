import "@/styles/globals.css";

import CurrentUserContext from "../components/auth/CurrentUser";

function MyApp({ Component, pageProps }) {
    return (
        <CurrentUserContext>
            <Component {...pageProps} />
        </CurrentUserContext>
    );
};

export default MyApp;