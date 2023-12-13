import styles from "./RegistrationForm.module.css";

import { useState } from "react";

import UserDbApi from "../../../pages/api/users/UserDbApi";

function RegistrationForm() {

    const [registrationFormData, setRegistrationFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
    });

    async function registerRequest(registrationFormData) {
        try {
            await UserDbApi.registerUser(registrationFormData);
            return { success: true };
        } catch (errors) {
            console.log("Registration failed.", errors);
            return { success: false, errors };
        };
    };

    async function handleSubmit(e) {
        e.preventDefault();
        let response = await registerRequest(registrationFormData);
        if (response.success) {
            console.log("good job it worked");
            // navigate("/");
        } else {
            console.log(response.errors);
        };
    };

    function handleChange(e) {
        const { name, value } = e.target;
        setRegistrationFormData((data) => ({ ...data, [name]: value }));
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
                        <input
                            className={styles.input}
                            type="password"
                            id="password"
                            name="password"
                            value={registrationFormData.password}
                            onChange={handleChange}
                            required
                        />
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