const jwt = require('jsonwebtoken');
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const { all } = require('../routes/UserRouter');

const login = async (req, res, next) => {
    try {
        const result = await User.login(req.body.data);
        if (result.error)
            return res.json({ error: result.error });
        const token = jwt.sign({
            user_id: result.user_id,
            user_name: result.user_name,
            email_id: result.email_id
        }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });
        res.json({ token, user: result });
    } catch (error) {
        // console.log(error);
        next(error);
    }
};

const register = async (req, res, next) => {
    try {
        // console.log(req);
        const result = await User.createUser(req.body.data);
        if (result.error)
            return res.json({ error: result.error });
        console.log(result);
        res.json({ result });
    } catch (error) {
        // console.log(error);
        next(error);
    }
}

const myProducts = async (req, res, next) => {
    try {
        const result = await User.getMyProducts(req.params.seller_id);
        if (result.error)
            return res.json({ error: result.error });
        res.json({ result });
    } catch (error) {
        // console.log(error);
        next(error);
    }
}

const otherProducts = async (req, res, next) => {
    try {
        const result = await User.getAllProducts(req.params.seller_id);
        if (result.error)
            return res.json({ error: result.error });
        res.json({ result });
    } catch (error) {
        // console.log(error);
        next(error);
    }
}

const myCart = async (req, res, next) => {
    try {
        const result = await User.getCart(req.params.customer_id);
        if (result.error)
            return res.json({ error: result.error });
        res.json({ result });
    } catch (error) {
        // console.log(error);
        next(error);
    }
}

const myHistory = async (req, res, next) => {
    try {
        const result = await User.getHistory(req.params.customer_id);
        if (result.error)
            return res.json({ error: result.error });
        res.json({ result });
    } catch (error) {
        // console.log(error);
        next(error);
    }
}

module.exports = { login, register, myProducts, otherProducts, myCart, myHistory };