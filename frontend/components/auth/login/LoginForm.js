import styles from "./LoginForm.module.css";

import Link from "next/link";
import { useState } from "react";

import UserDbApi from "../../../pages/api/users/UserDbApi";

function LoginForm() {
    const [loginFormData, setLoginFormData] = useState({
        username: "",
        password: "",
    });

    async function loginRequest(loginFormData) {
        try {
            await UserDbApi.login(loginFormData);
            console.log("success!!!");
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
            console.log("good job it worked");
            // navigate("/");
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