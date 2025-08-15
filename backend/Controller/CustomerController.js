const Customer = require('../model/Customer');

const addtoCart = async (req, res, next) => {
    try {
        const result = await Customer.addCart(req.body.data);
        if (result.error)
            return res.json({ error: result.error });
        res.json({ result });
    } catch (error) {
        // console.log(error);
        return res.json({ error: "error while adding" });
        // next(error);
    }
};

const buyfromCart = async (req, res, next) => {
    try {
        const result = await Customer.buyCart(req.params.customer_id);
        if (result.error)
            return res.json({ error: result.error });
        res.json({ result });
    } catch (error) {
        next(error);
    }
};

const removeCartItem = async (req, res, next) => {
    try {
        const result = await Customer.removeCart(req.params);
        if (result.error)
            return res.json({ error: result.error });
        res.json({ result });
    } catch (error) {
        next(error);
    }
};

const changeQuantity = async (req, res, next) => {
    try {
        const result = await Customer.changeNumberinCart(req.body.data);
        if (result.error)
            return res.json({ error: result.error });
        res.json({ result });
    } catch (error) {
        next(error);
    }
};

module.exports = { addtoCart, buyfromCart, removeCartItem, changeQuantity };