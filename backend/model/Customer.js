const pool = require('../config/db');
const query = require('query');

const Customer = {
    addCart: async ({ customer_id, product_id, quantity }) => {
        console.log(customer_id, product_id, quantity);
        try {
            const item_state = "Cart";
            const [check] = await pool.query(`
            select * from Cart where customer_id = ? and product_id = ?;
        `, [customer_id, product_id]);
            if (check.length !== 0)
                return error({ error: "Product is already present in cart" });
            const [add] = await pool.query(`
            insert into Cart (customer_id, product_id, item_state, quantity) values
            (?, ?, ?, ?); 
        `, [customer_id, product_id, item_state, quantity]);
            return ({ success: true });
        } catch (error) {
            console.log(error);
            return { error: error.message };
        }
    },

    buyCart: async (customer_id) => {
        try {
            const item_state = "Bought";
            const [check] = await pool.query(`
                select product_id, quantity from Cart where customer_id = ?;
            `, [customer_id]);
            console.log(check);
            if (check.length === 0)
                return ({ error: "No product is added by this customer" });
            const [buy] = await pool.query(`
                update Cart set item_state = ? where customer_id = ?;
            `, [item_state, customer_id]);
            for (const { product_id, quantity } of check) {
                await pool.query(`
                    update Product set quantity = quantity - ? where product_id = ?;
                `, [quantity, product_id]);
            }
            return ({ success: true });
        } catch (error) {
            console.log(error);
            return { error: error.message };
        }
    },

    removeCart: async ({ customer_id, product_id }) => {
        const [check] = await pool.query(`
            select * from Cart where customer_id = ?;
        `, [customer_id]);
        if (check.length === 0)
            return error({ error: "No product is added by this customer" });
        const [remove] = await pool.query(`
            delete from Cart where customer_id = ? and product_id = ?;    
        `, [customer_id, product_id]);
        return ({ success: true });
    },

    changeNumberinCart: async ({ customer_id, product_id, quantity }) => {
        const [check] = await pool.query(`
            select * from Cart where customer_id = ?;
        `, [customer_id]);
        if (check.length === 0)
            return error({ error: "No product is added by this customer" });
        const [update] = await pool.query(`
            update Cart set quantity = ? where customer_id = ? and product_id = ?; 
        `, [quantity, customer_id, product_id]);
        return ({ success: true });
    }
};

module.exports = Customer;