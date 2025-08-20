import React, { useState, useEffect } from "react";
import { ProductAPI } from "../api/api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "../styles/form.module.css";

const getUser = () => {
    try { return JSON.parse(localStorage.getItem("user")) || null; }
    catch { return null; }
};

export default function UpdateProduct() {
    const user = getUser();
    const { productId } = useParams();
    const navigate = useNavigate();
    const { state } = useLocation(); // may contain product
    const [newPrice, setPrice] = useState("");
    const [newQuantity, setQty] = useState("");

    useEffect(() => {
        if (state?.product) {
            setPrice(state.product.price);
            setQty(state.product.quantity);
        }
    }, [state]);

    async function onSubmit(e) {
        e.preventDefault();
        try {
            await ProductAPI.updateProduct(user.user_id, Number(productId), Number(newPrice), Number(newQuantity));
            alert("Updated");
            navigate(`/my-products/${user.user_id}`);
        } catch (e) {
            alert(e?.response?.data?.error || "Failed to update");
        }
    }

    return (
        <div className={styles.formContainer}>
            <h2>Update Product</h2>
            <form onSubmit={onSubmit} className={styles.form}>
                <label>New Price</label>
                <input value={newPrice} onChange={(e) => setPrice(e.target.value)} type="number" min="0" required />
                <label>New Quantity</label>
                <input value={newQuantity} onChange={(e) => setQty(e.target.value)} type="number" min="0" required />
                <button type="submit">Update</button>
            </form>
        </div>
    );
}
