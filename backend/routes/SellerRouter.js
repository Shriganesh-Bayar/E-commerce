const router = require('express').Router();
const { newProduct, deleteProduct, updatemyProduct } = require('../controller/SellerController');
const authorize = require('../middleware/authorization')

router.post('/add', authorize, newProduct);
router.get('/removeProduct/:product_id',  authorize, deleteProduct);
router.post('/updateProduct', authorize, updatemyProduct);
module.exports = router; 