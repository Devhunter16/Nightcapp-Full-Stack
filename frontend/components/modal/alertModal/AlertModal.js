import styles from "./AlertModal.module.css";

import { useModal } from "../ModalContext"

function Alert() {
    const { closeModal, primaryMessage, secondaryMessage } = useModal()

    return (
        <div id={styles.background} onClick={closeModal}>
            <div id={styles.alertContainer}>
                <button
                    id={styles.exitButton}
                    onClick={closeModal}>X</button>
                <div id={styles.column}>
                    <h1 id={styles.primaryMessage}>{primaryMessage}</h1>
                    <p>{secondaryMessage}</p>
                </div>
            </div>
        </div>
    );
};

export default Alert;
