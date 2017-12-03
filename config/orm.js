var connection = require("./connection.js");

// Object Relational Mapper (ORM)

var orm = {
  selectAllCategoryName: function(tableName, callback) {
    var queryString = "SELECT categoryid1 FROM ?? WHERE categoryid1 != '' AND categoryid1 NOT IN('Groceries','Travel & Luggage') GROUP BY categoryid1";
    connection.query(queryString, [tableName], function(err, result) {
      if(err) throw err;
        callback(result);
    });
  },
  findItem: function (tableName, searchQuery, callback) {
      var queryString = "SELECT * FROM ?? where name LIKE '%" + searchQuery + "%'";
      connection.query(queryString, [tableName], function(err, result) {
          if(err) throw err;
          callback(result);
      });
  },
  findCategory: function (tableName, categorySearch, callback) {
      var queryString = "SELECT * FROM ?? WHERE categoryid1=\"" + categorySearch + "\"";
      connection.query(queryString, [tableName], function(err, result) {
          if(err) throw err;
          callback(result);
      });
  }
};

module.exports = orm;
