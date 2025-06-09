const router = require('express').Router();
const Customer = require('../model/Customer');

router.post('/add', async (req, res, next) => {
    try {
        const result = await Customer.addCart(req.body.data);
        if (result.error)
            return res.json({ error: result.error });
        res.json({ result });
    } catch (error) {
        next(error);
    }
});

router.get('/cartBuy/:product_id', async (req, res, next) => {
    try {
        const result = await Customer.buyCart(req.params.product_id);
        if (result.error)
            return res.json({ error: result.error });
        res.json({ result });
    } catch (error) {
        next(error);
    }
});

router.get('/removeItem/:product_id', async (req, res, next) => {
    try {
        const result = await Customer.removeCart(req.params.product_id);
        if (result.error)
            return res.json({ error: result.error });
        res.json({ result });
    } catch (error) {
        next(error);
    }
});

router.post('/cartUpdate', async (req, res, next) => {
    try {
        const result = await Customer.changeNumberinCart(req.body.data);
        if (result.error)
            return res.json({ error: result.error });
        res.json({result});
    } catch (error) {
        next(error);
    }
})

module.exports = router; 