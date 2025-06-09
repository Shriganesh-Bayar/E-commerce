const pool = require('../config/db');
const bcrypt = require('bcrypt');
const { query } = require('query');
const saltRound = 17;

const User = {
    createUser: async ({ user_name, email_id, password }) => {
        const [rows] = await pool.query(`
            select * from User where email_id = ?;    
        `, [email_id]);
        if (rows.length !== 0)
            return { error: "This email id already exists, Login please!" };
        const hash = bcrypt.hashSync(password, saltRound);
        const [create] = await pool.query(`
            insert into User (user_name, email_id, password) values 
            (?, ?, ?); 
        `, [user_name, email_id, hash]);
        return ({
            success: true,
            user_id: create.insertId
        });
    },

    login: async ({ email_id, password }) => {
        const [rows] = await pool.query(`
            select * from User where email_id = ?;    
        `, [email_id]);
        if (rows.length === 0)
            return { error: "This email id doesn't exist" };
        const user = rows[0];
        if (bcrypt.compareSync(password, user.password)) {
            return ({
                success: true,
                user_id: user.user_id,
                email_id: user.email_id,
                user_name: user.user_name
            });
        }
        return { error: "Incorrect password" }
    },

    changePassword: async ({ user_id, oldPassword, newPassword }) => {
        const [rows] = await pool.query(`
            select * from User where user_id = ?;
        `, [user_id]);
        if (rows.length === 0)
            return { error: "Users doesn't exist" };
        const user = rows[0];
        if (bcrypt.compareSync(oldPassword, rows.password)) {
            const hash = bcrypt.hashSync(newPassword, saltround);
            const query = `update User set password = ? where user_id = ?;`;
            const [res] = await pool.query(query, [hash, user_id]);
            return { success: true };
        }
        return { error: "Wrong password" }
    },

    getCart: async ({ user_id }) => {
        return await pool.query(`
            select * from Cart where customer_id = ?;    
        `, [user_id]);
    },

    getMyProducts: async ({ user_id }) => {
        return await pool.query(`
            select * from Product where seller_id = ?;    
        `, [user_id]);
    },

    getAllProducts: async ({ user_id }) => {
        return await pool.query(`
            select * from Product where seller_id != ?;    
        `, [user_id]);
    },

    getHistory: async ({ user_id }) => {
        const item_state = "Bought";
        return await pool.query(`
            select * from Cart where customer_id = ? and item_state = ?    
        `, [user_id, item_state]);
    }
};

module.exports = User;