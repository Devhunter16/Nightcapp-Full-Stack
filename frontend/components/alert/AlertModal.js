import styles from "./AlertModal.module.css";

function Alert(props) {
    return (
        <div id={styles.background} onClick={props.close}>
            <div id={styles.alertContainer}>
                <button
                    id={styles.exitButton}
                    onClick={props.close}>X</button>
                <div id={styles.column}>
                    <h1 id={styles.primaryMessage}>{props.primaryMessage}</h1>
                    <p>{props.secondaryMessage}</p>
                </div>
            </div>
        </div>
    );
};

export default Alert;
