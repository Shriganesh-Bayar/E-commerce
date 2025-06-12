const router = require('express').Router();
const Customer = require('../model/Customer');
const authenticate = require('../middleware/authnetication')

router.get('/',  authenticate, async (req, res, next) => {
    res.json({ message: "In the customer router..." });
});

router.post('/add',  authenticate, async (req, res, next) => {
    try {
        const result = await Customer.addCart(req.body.data);
        if (result.error)
            return res.json({ error: result.error });
        res.json({ result });
    } catch (error) {
        // console.log(error);
        return res.json({error: "error while adding"});
        // next(error);
    }
});

router.get('/cartBuy/:customer_id',  authenticate, async (req, res, next) => {
    try {
        const result = await Customer.buyCart(req.params.customer_id);
        if (result.error)
            return res.json({ error: result.error });
        res.json({ result });
    } catch (error) {
        next(error);
    }
});

router.get('/removeItem/:product_id/:customer_id',  authenticate, async (req, res, next) => {
    try {
        const result = await Customer.removeCart(req.params);
        if (result.error)
            return res.json({ error: result.error });
        res.json({ result });
    } catch (error) {
        next(error);
    }
});

router.post('/cartUpdate',  authenticate, async (req, res, next) => {
    try {
        const result = await Customer.changeNumberinCart(req.body.data);
        if (result.error)
            return res.json({ error: result.error });
        res.json({ result });
    } catch (error) {
        next(error);
    }
})

module.exports = router; 