import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/navbar.module.css";

const getUser = () => {
    try { return JSON.parse(localStorage.getItem("user")) || null; }
    catch { return null; }
};

export default function Navbar() {
    const navigate = useNavigate();
    const user = getUser();

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.brand}>
                <Link to="/">E-Store</Link>
            </div>

            <div className={styles.links}>
                {user && (
                    <>
                        <Link to="/all-products">Products</Link>
                        <Link to={`/cart/${user.user_id}`}>Cart</Link>
                        <Link to={`/history/${user.user_id}`}>History</Link>
                        <Link to={`/my-products/${user.user_id}`}>My Products</Link>
                        <Link to="/add-product">Add Product</Link>
                    </>
                )}
                {!user ? (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register" className={styles.cta}>Register</Link>
                    </>
                ) : (
                    <button onClick={logout} className={styles.logout}>Logout</button>
                )}
            </div>
        </nav>
    );
}
