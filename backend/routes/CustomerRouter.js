const router = require('express').Router();
const { addtoCart, removeCartItem, changeQuantity, buyfromCart } = require('../controller/CustomerController');
const authorize = require('../middleware/authorization')

router.post('/', authorize, async (req, res, next) => {
    res.json({ message: "In the customer router..." });
});
router.post('/addCart', authorize, addtoCart);
router.get('/cartBuy/:customer_id', authorize, buyfromCart);
router.get('/removeItem/:product_id/:customer_id', authorize, removeCartItem);
router.post('/cartUpdate', authorize, changeQuantity);
module.exports = router;  