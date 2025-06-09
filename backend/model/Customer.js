const pool = require('../config/db');
const { query } = require('query');

const Customer = {
    addCart: async ({ customer_id, product_id, purchase_date }) => {
        const item_state = "Cart";
        const [check] = await query(`
            select * from Cart where customer_id = ? and product_id = ?;
        `, [customer_id, product_id]);
        if (check.length !== 0)
            return error({ error: "Product is already present in cart" });
        const [add] = await query(`
            insert into Product (customer_id, product_id, item_state, purchase_date) values
            (?, ?, ?, ?); 
        `, [customer_id, product_id, item_state, purchase_date]);
        return ({ success: true });
    },

    buyCart: async ({ customer_id }) => {
        const item_state = "Bought";
        const [check] = await query(`
            select * from Cart where customer_id = ?;
        `, [customer_id]);
        if (check.length === 0)
            return error({ error: "No product is added by this customer" });
        const [buy] = await query(`
            update Cart set item_state = ? where customer_id = ?;
        `, [item_state, customer_id]);
        return ({ success: true });
    },

    removeCart: async ({ customer_id, product_id }) => {
        const [check] = await query(`
            select * from Cart where customer_id = ?;
        `, [customer_id]);
        if (check.length === 0)
            return error({ error: "No product is added by this customer" });
        const [remove] = await query(`
            delete from Cart where customer_id = ? and product_id = ?;    
        `, [customer_id, product_id]);
        return ({ success: true });
    },

    changeNumberinCart: async ({ customer_id, product_id, quantity }) => {
        const [check] = await query(`
            select * from Cart where customer_id = ?;
        `, [customer_id]);
        if (check.length === 0)
            return error({ error: "No product is added by this customer" });
        const [update] = await query(`
            update Cart set quantity = ? where customer_id = ? and product_id = ?; 
        `, [quantity, customer_id, product_id]);
        return ({ success: true });
    }
};

module.exports = Customer;