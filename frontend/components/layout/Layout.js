import styles from "./Layout.module.css";

import Head from "next/head";

import Navigation from "../nav/NavBar";
import AlertModal from "../modal/alertModal/AlertModal";
import Footer from "../footer/Footer";
import { useModal } from "../modal/ModalContext"

function Layout(props) {
    const { isModalOpen } = useModal()

    return (
        <>
            <Head>
                <title> Nightcapp </title>
                <link
                    href="https://fonts.googleapis.com/css2?family=League+Spartan&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css?family=Vibur:400"
                    rel="stylesheet"
                    type="text/css"
                ></link>
            </Head>
            <div className={styles.container}>
                {isModalOpen && <AlertModal />}
                <Navigation />
                <main className={styles.main}>
                    {props.children}
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Layout;