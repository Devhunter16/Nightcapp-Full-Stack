import Link from "next/link";
import styles from "./LoginForm.module.css";

function LoginForm() {
    return (
        <>
            <h3 className={styles.loginIntro}>Welcome!</h3>
            <div className={styles.loginForm}>
                <form>
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
                            Log In
                        </button>
                    </div>
                    <Link className={styles.btnSignup} type="submit" href="/register">
                        New here? Sign up!
                    </Link>
                </form>
            </div>
        </>
    );
};

export default LoginForm;