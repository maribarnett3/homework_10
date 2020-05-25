// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var burger = {
  all: function(cb) {
    orm.all("employee", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create("employee", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("employee", objColVals, condition, function(res) {
      cb(res);
    });
  },
  selectWhere: function(colToSearch, valOfCol, cb) {
    orm.selectWhere("employee", colToSearch, valOfCol, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("employee", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (burgerController.js).
module.exports = burger;
