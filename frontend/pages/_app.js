import "@/styles/globals.css";

import CurrentUserContext from "../components/auth/CurrentUser";
import { ModalProvider } from "../components/modal/ModalContext";

function MyApp({ Component, pageProps }) {
    return (
        <CurrentUserContext>
            <ModalProvider>
                <Component {...pageProps} />
            </ModalProvider>
        </CurrentUserContext>
    );
};

export default MyApp;