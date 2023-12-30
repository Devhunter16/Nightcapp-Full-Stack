import styles from "./RegistrationForm.module.css";

import { useState, useContext } from "react";
import { useRouter } from "next/router";

import CurrentUserContext from "../CurrentUserContext";
import UserDbApi from "../../../pages/api/users/UserDbApi";

function RegistrationForm() {
    const router = useRouter();
    const { setToken } = useContext(CurrentUserContext);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [registrationFormData, setRegistrationFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
    });

    async function registerRequest(registrationFormData) {
        try {
            let token = await UserDbApi.registerUser(registrationFormData);
            setToken(token);
            return { success: true };
        } catch (errors) {
            console.log("Registration failed.", errors);
            return { success: false, errors };
        };
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await registerRequest(registrationFormData);
        if (response.success) {
            router.push("/");
        } else {
            console.log(response.errors);
        };
    };

    function handleChange(e) {
        const { name, value } = e.target;
        setRegistrationFormData((data) => ({ ...data, [name]: value }));
    };

    function togglePasswordVisibility() {
        setIsPasswordVisible(prevState => !prevState);
    };

    return (
        <>
            <h3 className={styles.registrationIntro}>Sign up with us today!</h3>
            <div className={styles.registrationForm}>
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
                            value={registrationFormData.firstName}
                            onChange={handleChange}
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
                            value={registrationFormData.lastName}
                            onChange={handleChange}
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
                            value={registrationFormData.username}
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
                                value={registrationFormData.password}
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
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default RegistrationForm;