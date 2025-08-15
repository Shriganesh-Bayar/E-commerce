const pool = require('../config/db');
const bcrypt = require('bcrypt');
const { query } = require('query');
const saltRound = 17;

const User = {
    createUser: async ({ user_name, email_id, password }) => {
        try {
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
        } catch (error) {
            console.log(error);
            return {error: error.message}
        }
    },

    login: async ({ email_id, password }) => {
        try {
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
        } catch (error) {
            console.log(error);
            return {error: error.message}
        }
    },

    changePassword: async ({ user_id, oldPassword, newPassword }) => {
        try {
            const [rows] = await pool.query(`
                select 1 from User where user_id = ?;
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
        } catch (error) {
            console.log(error);
            return {error: error.message}
        }
    },

    getCart: async (user_id) => {
        try {
            const [rows] = await pool.query(`
                select * from Cart where customer_id = ?;    
            `, [user_id]);
            return rows;
        } catch (error) {
            console.log(error);
            return {error: error.message}
        }
    },

    getMyProducts: async (user_id) => {
        try {
            const [rows] = await pool.query(`
                select * from Cart where seller_id = ? and quantity > 0;    
            `, [user_id]);
            return rows;
        } catch (error) {
            console.log(error);
            return {error: error.message}
        }
    },

    getAllProducts: async (user_id) => {
        try {
            const [rows] = await pool.query(`
                select * from Cart where seller_id != ? and quantity > 0;    
            `, [user_id]);
            return rows;
        } catch (error) {
            console.log(error);
            return {error: error.message}
        }
    },

    getHistory: async (user_id) => {
        try {
            const [rows] = await pool.query(`
                select * from History where customer_id = ?"    
            `, [user_id]);
            return rows;
        } catch (error) {
            console.log(error);
            return { error: error.message };
        }
    }
};

module.exports = User;