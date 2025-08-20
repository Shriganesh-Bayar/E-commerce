import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthAPI } from "../api/api";
import styles from "../styles/form.module.css";

export default function Register() {
    const [user_name, setName] = useState("");
    const [email_id, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function onSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await AuthAPI.register(user_name, email_id, password);
            alert("Registered successfully. Please login.");
            navigate("/login");
        } catch (err) {
            alert(err?.response?.data?.error || "Registration failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.formContainer}>
            <h2>Register</h2>
            <form onSubmit={onSubmit} className={styles.form}>
                <label>Username</label>
                <input value={user_name} onChange={(e) => setName(e.target.value)} required />
                <label>Email</label>
                <input value={email_id} onChange={(e) => setEmail(e.target.value)} type="email" required />
                <label>Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
                <button disabled={loading} type="submit">{loading ? "..." : "Create account"}</button>
                <p className={styles.helper}>
                    Have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
}
