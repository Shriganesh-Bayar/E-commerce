import React, { useEffect, useState } from "react";
import { ProductAPI, CartAPI } from "../api/api";
import ProductCard from "../components/ProductCard";
import styles from "../styles/products.module.css";

const getUser = () => {
    try { return JSON.parse(localStorage.getItem("user")) || null; }
    catch { return null; }
};

export default function AllProducts() {
    const user = getUser();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    async function load() {
        console.log("load called ...")
        setLoading(true);
        try {
            const data = await ProductAPI.allProducts(user.user_id);
            console.log(data);
            setItems(data?.result);
        } catch (e) {
            alert(e?.response?.data?.error || "Failed to load products");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { load(); }, []);

    async function handleAddToCart(product, qty) {
        try {
            await CartAPI.addToCart(user.user_id, product.product_id, qty);
            alert("Added to cart");
        } catch (e) {
            alert(e?.response?.data?.error || "Failed to add to cart");
        }
    }

    return (
        <div className={styles.wrapper}>
            <h2>All Products</h2>
            {loading ? <p>Loading...</p> : (
                <div className={styles.grid}>
                    {items.map(p => (
                        <ProductCard key={p.product_id} product={p} onAddToCart={handleAddToCart} />
                    ))}
                </div>
            )}
        </div>
    );
}
