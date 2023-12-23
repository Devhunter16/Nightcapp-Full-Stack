import styles from "./LoginForm.module.css";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

import CurrentUserContext from "../CurrentUserContext";
import UserDbApi from "../../../pages/api/users/UserDbApi";

function LoginForm() {
    const router = useRouter();
    const { setToken } = useContext(CurrentUserContext);

    const [loginFormData, setLoginFormData] = useState({
        username: "",
        password: "",
    });

    async function loginRequest(loginFormData) {
        console.log("Login form data:", loginFormData);
        try {
            let token = await UserDbApi.loginUser(loginFormData);
            setToken(token);
            return { success: true };
        } catch (errors) {
            console.log("Login failed", errors);
            return { success: false, errors };
        };
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await loginRequest(loginFormData);
        if (response.success) {
            router.push("/");
        } else {
            console.log(response.errors);
        };
    };

    function handleChange(e) {
        const { name, value } = e.target;
        setLoginFormData((data) => ({ ...data, [name]: value }));
    };

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
                            value={loginFormData.username}
                            onChange={handleChange}
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
                            value={loginFormData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <button className={styles.btn} type="submit" onClick={handleSubmit}>
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