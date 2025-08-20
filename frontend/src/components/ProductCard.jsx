import React, { useState } from "react";
import styles from "../styles/products.module.css";

export default function ProductCard({
    product,
    isOwn = false,
    onAddToCart,
    onUpdate,
    onRemove
}) {
    const [qty, setQty] = useState(1);

    return (
        <div className={styles.card}>
            <div className={styles.thumb}>
                {/* backend key is "image" per your spec */}
                <img src={product.image || product.image_url || ""} alt={product.product_name} />
            </div>
            <div className={styles.meta}>
                <h3 className={styles.title}>{product.product_name}</h3>
                <div className={styles.priceRow}>
                    <span className={styles.price}>₹ {product.price}</span>
                    <span className={styles.qty}>Stock: {product.quantity}</span>
                </div>

                {!isOwn ? (
                    <div className={styles.actions}>
                        <input
                            type="number"
                            min="1"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                        />
                        <button onClick={() => onAddToCart?.(product, qty)}>
                            Add to Cart
                        </button>
                    </div>
                ) : (
                    <div className={styles.actions}>
                        <button onClick={() => onUpdate?.(product)}>Update</button>
                        <button className={styles.danger} onClick={() => onRemove?.(product)}>
                            Remove
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
