const pool = require('../config/db');
const { query } = require('query');

const Seller = {
    addNew: async ({ seller_id, product_name, price, quantity, image }) => {
        try {
            const [check] = await pool.query(`
                select 1 from Product where seller_id = ? and product_name = ?;
            `, [seller_id, product_name]);

            // updating if there is this same prodcut
            if (check.length !== 0) {
                await pool.query(`
                    update product set price = ?, quantity = quantity + ?, image_url = ?, release_date = current_timestamp where product_id = ?
                `, [price, quantity, image, product_id]);
                return ({
                    success: true,
                    product_id: add.product_id
                });
            }

            // add new product
            await pool.query(`
                insert into Product (seller_id, product_name, price, quantity, image) values
                (?, ?, ?, ?, ?); 
            `, [seller_id, product_name, price, quantity, image]);
            return ({
                success: true,
                product_id: add.product_id
            });
        } catch (error) {
            console.log(error);
            return { error: error.message };
        }
    },

    updateProduct: async ({ seller_id, product_id, newPrice, newQuantity }) => {
        try {
            const [update] = await pool.query(`
                update Product set price = ?, quantity = ? where product_id = ? and seller_id = ?
            `, [newPrice, newQuantity, product_id, seller_id]);
            if (update.length === 0)
                return error({ error: "No product" });
            return ({ success: true });
        } catch (error) {
            console.log(error);
            return { error: error.message };
        }
    },

    removeProduct: async ({ seller_id, product_id }) => {
        try {
            const [update] = await pool.query(`
                update Product set quantity = 0 where product_id = ? and seller_id = ?  
            `, [product_id, seller_id]);
            if (update.length === 0)
                return error({ error: "This product is not in the current user's cart" });
            return ({ success: true });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
};

module.exports = Seller;