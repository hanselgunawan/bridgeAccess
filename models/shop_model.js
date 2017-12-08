/**
 * Created by hansel.tritama on 12/2/17.
 */
var orm = require("../config/orm.js");

var dbCall = {
    selectAllCategoryName: function (tableName, callback) {
        orm.selectAllCategoryName(tableName, function (data) {
            callback(data);
        });
    },
    selectAllCategoryAndSubcategoryName: function (tableName, callback) {
        orm.selectAllCategoryAndSubcategoryName(tableName, function (data) {
            callback(data);
        });
    },
    selectAllProducts: function (tableName, callback) {
        orm.selectAllProducts(tableName, function (data) {
            callback(data);
        });
    },
    selectPriceRange: function (tableName, callback) {
        orm.selectPriceRange(tableName, function (data) {
            callback(data);
        });
    },
    findItem: function (tableName, searchQuery, callback) {
        orm.findItem(tableName, searchQuery, function (data) {
            callback(data);
        });
    },
    findCategory: function (tableName, categorySearch, callback) {
        orm.findCategory(tableName, categorySearch, function (data) {
            callback(data);
        });
    },
    findSubCategory: function (tableName, categorySearch, callback) {
        orm.findSubCategory(tableName, categorySearch, function (data) {
            callback(data);
        });
    },
    selectProduct: function (tableName, productId, callback) {
        orm.selectProduct(tableName, productId, function (data) {
            callback(data);
        });
    }
};

module.exports =  dbCall;