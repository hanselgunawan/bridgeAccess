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
    findItem: function (tableName, searchQuery, callback) {
        orm.findItem(tableName, searchQuery, function (data) {
            callback(data);
        });
    },
    findCategory: function (tableName, categorySearch, callback) {
        orm.findCategory(tableName, categorySearch, function (data) {
            callback(data);
        });
    }
};

module.exports =  dbCall;