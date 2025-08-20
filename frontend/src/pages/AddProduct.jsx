import React, { useState } from "react";
import { ProductAPI } from "../api/api";
import styles from "../styles/form.module.css";

const getUser = () => {
    try { return JSON.parse(localStorage.getItem("user")) || null; }
    catch { return null; }
};

export default function AddProduct() {
    const user = getUser();
    const [product_name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQty] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

    async function onSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await ProductAPI.addProduct(user.user_id, product_name, Number(price), Number(quantity), image);
            alert("Product added/updated quantity");
            setName(""); setPrice(""); setQty(""); setImage("");
        } catch (e) {
            alert(e?.response?.data?.error || "Failed to add product");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.formContainer}>
            <h2>Add Product</h2>
            <form onSubmit={onSubmit} className={styles.form}>
                <label>Product name</label>
                <input value={product_name} onChange={(e) => setName(e.target.value)} required />
                <label>Price</label>
                <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" min="0" required />
                <label>Quantity</label>
                <input value={quantity} onChange={(e) => setQty(e.target.value)} type="number" min="0" required />
                <label>Image URL</label>
                <input value={image} onChange={(e) => setImage(e.target.value)} type="url" placeholder="https://..." />
                <button disabled={loading} type="submit">{loading ? "..." : "Save"}</button>
            </form>
        </div>
    );
}
