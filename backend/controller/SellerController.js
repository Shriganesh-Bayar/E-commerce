const Seller = require('../model/Seller');

const newProduct = async (req, res, next) => {
    try {
        const result = await Seller.addNew(req.body.data);
        if (result.error)
            return res.json({ error: result.error });
        res.json({ result });
    } catch (error) {
        next(error);
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const result = await Seller.removeProduct(req.params.product_id);
        if (result.error)
            return res.json({ error: result.error });
        res.json({ result });
    } catch (error) {
        console.log("removeProduct:", error);
        next(error);
    }
};

const updatemyProduct = async (req, res, next) => {
    try {
        const result = await Seller.updateProduct(req.body.data);
        if (result.error)
            return res.json({ error: result.error });
        res.json({ result });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = { newProduct, deleteProduct, updatemyProduct };