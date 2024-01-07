import styles from "./LoginForm.module.css";

import Link from "next/link";
import { useState, useContext } from "react";
import { useRouter } from "next/router";

import CurrentUserContext from "../CurrentUserContext";
import { useModal } from "../../modal/ModalContext"
import UserDbApi from "../../../pages/api/users/UserDbApi";

// FIXME DON'T LET USERS LOG IN WITH EMPTY FIELDS

function LoginForm() {
    const router = useRouter();
    const { setUserStatus } = useModal()
    const { setToken, setCurrentUser } = useContext(CurrentUserContext);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [loginFormData, setLoginFormData] = useState({
        username: "",
        password: "",
    });

    async function loginRequest(loginFormData) {
        try {
            let result = await UserDbApi.loginUser(loginFormData);
            setCurrentUser(result.user.name);
            setToken(result.token);
            return { success: true };
        } catch (errors) {
            console.log("Login failed", errors);
            return { success: false, errors };
        };
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await loginRequest(loginFormData);
        setUserStatus("loggedIn");
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

    function togglePasswordVisibility() {
        setIsPasswordVisible(prevState => !prevState);
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
                        <div className={styles.passwordInputContainer}>
                            <input
                                className={styles.input}
                                type={isPasswordVisible ? "text" : "password"}
                                id="password"
                                name="password"
                                value={loginFormData.password}
                                onChange={handleChange}
                                required
                            />
                            <span
                                className={`${styles.togglePassword} ${isPasswordVisible ? styles.visible : ''}`}
                                onClick={togglePasswordVisibility}
                            >
                                👁
                            </span>
                        </div>
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