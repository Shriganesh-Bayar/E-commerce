const router = require('express').Router();
const Seller = require('../model/Seller');

router.post('/add', async (req, res, next) => {
    try {
        const result = await Seller.addNew(req.body.data);
        if (result.error)
            return res.json({ error: result.error });
        res.json({ result });
    } catch (error) {
        next(error);
    }
});

router.get('/removeProduct/:product_id', async (req, res, next) => {
    try {
        const result = await Seller.removeProduct(req.params.product_id);
        if (result.error)
            return res.json({ error: result.error });
        res.json({ result });
    } catch (error) {
        next(error);
    }
});

router.get('/updateProduct/:product_id', async (req, res, next) => {
    try {
        const result = await Seller.updateProductProduct(req.params.product_id);
        if (result.error)
            return res.json({ error: result.error });
        res.json({ result });
    } catch (error) {
        next(error);
    }
});

module.exports = router;