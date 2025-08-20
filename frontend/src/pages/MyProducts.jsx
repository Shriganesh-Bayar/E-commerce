import React, { useEffect, useState } from "react";
import { ProductAPI } from "../api/api";
import ProductCard from "../components/ProductCard";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../styles/products.module.css";

export default function MyProducts() {
    const { sellerId } = useParams();
    // console.log("params: ", sellerId);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    async function load() {
        setLoading(true);
        console.log("here ");
        try {
            const data = await ProductAPI.myProducts(Number(sellerId));
            // console.log("result: ", data);
            setItems(data?.result||[]);
        } catch (e) {
            alert(e?.response?.data?.error || "Failed to load my products");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { console.log("load "); load(); }, [sellerId]);

    async function onRemove(product) {
        if (!confirm(`Remove ${product.product_name}?`)) return;
        try {
            await ProductAPI.removeProduct(product.product_id);
            await load();
        } catch (e) {
            alert(e?.response?.data?.error || "Failed to remove");
        }
    }

    function onUpdate(product) {
        navigate(`/update-product/${product.product_id}`, { state: { product } });
    }

    return (
        <div className={styles.wrapper}>
            <h2>My Products</h2>
            {loading ? <p>Loading...</p> : (
                <div className={styles.grid}>
                    {items.map(p => (
                        <ProductCard
                            key={p.product_id}
                            product={p}
                            isOwn
                            onRemove={onRemove}
                            onUpdate={onUpdate}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
