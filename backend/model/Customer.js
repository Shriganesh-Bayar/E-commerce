const pool = require('../config/db');
const query = require('query');

const Customer = {
    addCart: async ({ customer_id, product_id, quantity }) => {
        try {
            const [check] = await pool.query(`
                select 1 from Cart where customer_id = ? and product_id = ?;
            `, [customer_id, product_id]);
            if (check.length !== 0) {
                await pool.query(`
                    update Cart set quantity = quantity + ? where customer_id = ? and product_id = ?;
                `, [quantity, customer_id, product_id]);
            } else {
                await pool.query(`
                    insert into Cart (customer_id, product_id, quantity) values
                    (?, ?, ?); 
                `, [customer_id, product_id, quantity]);
            }``
            return ({ success: true });
        } catch (error) {
            console.log(error);
            return { error: error.message };
        }
    },

    buyCart: async (customer_id) => {
        const con = await pool.getConnection();
        try {
            await con.beginTransaction();
            const [check] = await con.query(`
                select 
                    c.product_id, 
                    c.quantity as quantity, 
                    p.price as unit_price,
                    p.quantity as current_quantity
                from Cart c Join Product p on c.product_id = p.product_id
                where customer_id = ?;
            `, [customer_id]);
            console.log(check);
            if (check.length === 0) {
                await con.rollback();
                return ({ error: "No product is added by this customer" });
            }

            const insufficientItem = check.find(
                item => item.stock_quantity < item.cart_quantity
            );
            if (insufficientItem) {
                await con.rollback();
                return ({ error: "Insuffienct products" });
            }

            for (const { product_id, quantity, unit_price } of check) {
                await con.query(`
                    insert into Transaction (customer_id, product_id, quantity, purchase_price) values (?, ?, ?, ?)
                `, [customer_id, product_id, quantity, unit_price]);

                await con.query(`
                    update Product set quantity = quantity - ? where product_id = ?                 
                `, [quantity, product_id])
            }

            await con.query(`
                delete from Cart where customer_id = ?
            `, [customer_id]);

            await con.commit();
            return ({ success: true });
        } catch (error) {
            await con.rollback();
            console.log(error);
            return { error: error.message };
        } finally {
            await con.release();
        }
    },

    removeCart: async ({ customer_id, product_id }) => {
        try {
            const [check] = await pool.query(`
                select * from Cart where customer_id = ? and product_id = ?;
            `, [customer_id, product_id]);
            if (check.length === 0)
                return error({ error: "No product is added by this customer" });
            const [remove] = await pool.query(`
                delete from Cart where customer_id = ? and product_id = ?;    
            `, [customer_id, product_id]);
            return ({ success: true });
        } catch (error) {
            console.error(error);
            return { error: error.message };
        }
    },

    changeNumberinCart: async ({ customer_id, product_id, quantity }) => {
        try {
            const [check] = await pool.query(`
                select * from Cart where customer_id = ?;
            `, [customer_id]);
            if (check.length === 0)
                return error({ error: "No product is added by this customer" });
            if (quantity === 0) {
                return await module.exports.removeCart({ customer_id, product_id });
            }
            await pool.query(`
                update Cart set quantity = ? where customer_id = ? and product_id = ?; 
            `, [quantity, customer_id, product_id]);
            return ({ success: true });
        } catch (error) {
            console.error(error);
            return { error: error.message };
        }
    }
};

module.exports = Customer;