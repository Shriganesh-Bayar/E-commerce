import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartAPI } from "../api/api";
import styles from "../styles/products.module.css";

export default function Cart() {
    const { customerId } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    async function load() {
        setLoading(true);
        try {
            const data = await CartAPI.myCart(Number(customerId));
            console.log(data);
            setItems(data?.result||[]);
        } catch (e) {
            alert(e?.response?.data?.error || "Failed to load cart");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { load(); }, [customerId]);

    async function updateQty(product_id, qty) {
        try {
            await CartAPI.updateCartItem(Number(customerId), product_id, qty);
            await load();
        } catch (e) {
            alert(e?.response?.data?.error || "Failed to update");
        }
    }

    async function removeItem(product_id) {
        try {
            await CartAPI.removeItem(product_id, Number(customerId));
            await load();
        } catch (e) {
            alert(e?.response?.data?.error || "Failed to remove");
        }
    }

    async function buyAll() {
        if (!confirm("Buy all items in cart?")) return;
        try {
            await CartAPI.buyAll(Number(customerId));
            await load();
            alert("Purchase successful");
        } catch (e) {
            alert(e?.response?.data?.error || "Failed to purchase");
        }
    }

    const total = items.reduce((s, it) => s + (it.price * it.quantity), 0);

    return (
        <div className={styles.wrapper}>
            <h2>My Cart</h2>
            {loading ? <p>Loading...</p> : (
                <>
                    <div className={styles.cartList}>
                        {items.map(it => (
                            <div className={styles.cartRow} key={it.product_id}>
                                <img src={it.image || it.image_url || ""} alt={it.product_name} />
                                <div className={styles.cartInfo}>
                                    <div className={styles.cartName}>{it.product_name}</div>
                                    <div>₹ {it.price}</div>
                                </div>
                                <div className={styles.cartQty}>
                                    <button onClick={() => updateQty(it.product_id, Math.max(0, it.quantity - 1))}>-</button>
                                    <input
                                        type="number"
                                        min="0"
                                        value={it.quantity}
                                        onChange={(e) => updateQty(it.product_id, Number(e.target.value))}
                                    />
                                    <button onClick={() => updateQty(it.product_id, it.quantity + 1)}>+</button>
                                </div>
                                <div className={styles.cartSub}>₹ {it.price * it.quantity}</div>
                                <button className={styles.danger} onClick={() => removeItem(it.product_id)}>Remove</button>
                            </div>
                        ))}
                    </div>
                    <div className={styles.cartFooter}>
                        <div>Total: <strong>₹ {total}</strong></div>
                        <button onClick={buyAll} disabled={items.length === 0}>Buy All</button>
                    </div>
                </>
            )}
        </div>
    );
}
