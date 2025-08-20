import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HistoryAPI } from "../api/api";
import styles from "../styles/products.module.css";

export default function History() {
    const { customerId } = useParams();
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    async function load() {
        setLoading(true);
        try {
            const data = await HistoryAPI.myHistory(Number(customerId));
            setRows(Array.isArray(data) ? data : data?.history || []);
        } catch (e) {
            alert(e?.response?.data?.error || "Failed to load history");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { load(); }, [customerId]);

    return (
        <div className={styles.wrapper}>
            <h2>Purchase History</h2>
            {loading ? <p>Loading...</p> : (
                <div className={styles.historyTable}>
                    <div className={styles.hrow + " " + styles.header}>
                        <div>Product</div>
                        <div>Price</div>
                        <div>Qty</div>
                        <div>Date</div>
                        <div>Total</div>
                    </div>
                    {rows.map((r, idx) => (
                        <div key={idx} className={styles.hrow}>
                            <div className={styles.hprod}>
                                <img src={r.image || r.image_url || ""} alt={r.product_name} />
                                <span>{r.product_name}</span>
                            </div>
                            <div>₹ {r.price}</div>
                            <div>{r.quantity}</div>
                            <div>{new Date(r.purchase_date || r.created_at || r.date || Date.now()).toLocaleString()}</div>
                            <div>₹ {r.price * r.quantity}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
