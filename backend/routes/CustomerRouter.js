const router = require('express').Router();
const Customer = require('../model/Customer');

router.post('/add', async (req, res, next) => {
    try {

    } catch (error) {
        next(error);
    }
});

router.post('/cartBuy/:prdoduct_id', async (req, res, next) => {
    try {

    } catch (error) {
        next(error);
    }
});

router.post('/removeItem/:produc_id', async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error);
    }
});

module.exports = router; 