const router = require('express').Router();
const Seller = require('../model/Seller');
const authenticate = require('../middleware/authnetication')

router.post('/add', authenticate, async (req, res, next) => {
    try {
        const result = await Seller.addNew(req.body.data);
        if (result.error)
            return res.json({ error: result.error });
        res.json({ result });
    } catch (error) {
        next(error);
    }
});

router.get('/removeProduct/:product_id',  authenticate, async (req, res, next) => {
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

router.post('/updateProduct', authenticate, async (req, res, next) => {
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