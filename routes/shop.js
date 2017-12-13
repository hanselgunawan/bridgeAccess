var express = require('express');
var router  = express.Router();

var shop_controller = require('../controllers/shop_controller');

router.get('/product_categories/:page', shop_controller.showProducts);
router.get('/product_categories/search/:itemSearch/:page', shop_controller.searchItem);
router.get('/product_categories/category/:categorySearch/:page', shop_controller.filterByCategory);
router.get('/product_categories/subcategory/:subCategorySearch/:page', shop_controller.filterBySubCategory);
router.get('/product_categories/:page/filter', shop_controller.filterByUserInput);
router.get('/product_details/:itemId', shop_controller.showProductDetail);
router.get('/success_checkout', shop_controller.successCheckout);

module.exports = router;