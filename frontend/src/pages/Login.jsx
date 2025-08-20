import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthAPI } from "../api/api";
import styles from "../styles/form.module.css";

export default function Login() {
    const [email_id, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function onSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await AuthAPI.login(email_id, password);
            // Expecting { token, user }
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/all-products");
        } catch (err) {
            alert(err?.response?.data?.error || "Login failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.formContainer}>
            <h2>Login</h2>
            <form onSubmit={onSubmit} className={styles.form}>
                <label>Email</label>
                <input value={email_id} onChange={(e) => setEmail(e.target.value)} type="email" required />
                <label>Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
                <button disabled={loading} type="submit">{loading ? "..." : "Login"}</button>
                <p className={styles.helper}>
                    No account? <Link to="/register">Register</Link>
                </p>
            </form>
        </div>
    );
}
