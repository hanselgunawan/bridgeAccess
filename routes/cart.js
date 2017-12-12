var express = require('express');
var router  = express.Router();

var cart_controller = require('../controllers/cart_controller');

router.get('/', cart_controller.viewCart);
router.post('/update', cart_controller.updateQuantity);
router.post('/delete', cart_controller.deleteItem);
router.post('/insert', cart_controller.insertItem);
// router.get('/show', cart_controller.page);

module.exports = router;