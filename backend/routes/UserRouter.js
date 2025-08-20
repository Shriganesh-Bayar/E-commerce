const router = require('express').Router();
const { login, register, myProducts, otherProducts, myCart, myHistory, } = require('../controller/UserController');
const authenticate = require('../middleware/authorization')

router.post('/login', login);
router.post('/register', register);
router.get('/myProducts/:seller_id', authenticate, myProducts);
router.get('/allProducts/:seller_id', authenticate, otherProducts);
router.get('/cart/:customer_id', authenticate, myCart);
router.get('/history/:customer_id', authenticate, myHistory);

module.exports = router; 