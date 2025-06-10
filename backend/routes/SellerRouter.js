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
        console.log("removeProduct:", error);
        next(error);
    }
});

router.post('/updateProduct', async (req, res, next) => {
    try {
        const result = await Seller.updateProduct(req.body.data);
        if (result.error)
            return res.json({ error: result.error });
        res.json({ result });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;