const pool = require('../config/db');
const { query } = require('query');

const Seller = {
    addNew: async ({ seller_id, product_name, price, quantity }) => {
        const [check] = await pool.query(`
            select * from Product where seller_id = ? and product_name = ?;
        `, [seller_id, product_name]);
        if (check.length !== 0)
            return error({ error: "Product of this user already exist" });
        const [add] = await pool.query(`
            insert into Product (seller_id, product_name, price, quantity) values
            (?, ?, ?); 
        `, [seller_id, product_name, price, quantity]);
        return ({
            success: true,
            product_id: add.product_id
        });
    },

    updateProduct: async ({ product_id, newPrice, newQuantity }) => {
        const [check] = await pool.query(`
            select * from Product where product_id = ?;
        `, [product_id]);
        if (check.length === 0)
            return error({ error: "Product of this user already exist" });
        const [update] = await pool.query(`
            update Product set price = ?, quantity = ? where product_id = ?    
        `, [newPrice, newQuantity, product_id]);
        return ({ success: true });
    },

    removeProduct: async ({ product_id }) => {
        const [check] = await pool.query(`
            select * from Product where product_id = ?;
        `, [product_id]);
        if (check.length === 0)
            return error({ error: "Product of this user already exist" });
        const [remove] = await pool.query(`
            delete from Product where product_id = ?;    
        `, [product_id]);
        return ({ success: true });
    }
};

module.exports = Seller;