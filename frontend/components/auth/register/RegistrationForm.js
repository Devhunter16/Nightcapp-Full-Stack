import styles from "./RegistrationForm.module.css";

function RegistrationForm() {

    return (
        <>
            <h3 className={styles.signupIntro}>Sign up with us today!</h3>
            <div className={styles.signupForm}>
                <form>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="firstName">
                            First Name:
                        </label>
                        <input
                            className={styles.input}
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={""}
                            onChange={""}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="lastName" className={styles.label}>
                            Last Name:
                        </label>
                        <input
                            className={styles.input}
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={""}
                            onChange={""}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="username" className={styles.label}>
                            Username:
                        </label>
                        <input
                            className={styles.input}
                            type="text"
                            id="username"
                            name="username"
                            value={""}
                            onChange={""}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.label}>
                            Password:
                        </label>
                        <input
                            className={styles.input}
                            type="password"
                            id="password"
                            name="password"
                            value={""}
                            onChange={""}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <button className={styles.btn} type="submit" onClick={""}>
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default RegistrationForm;