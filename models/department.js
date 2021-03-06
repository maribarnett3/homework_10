// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var burger = {
    all: function (cb) {
        orm.all("department", function (res) {
            cb(res);
        });
    },
    // The variables cols and vals are arrays.
    create: function (cols, vals, cb) {
        orm.create("department", cols, vals, function (res) {
            cb(res);
        });
    },
    update: function (objColVals, condition, cb) {
        orm.update("department", objColVals, condition, function (res) {
            cb(res);
        });
    },
    getBudget: function (id, cb) {
        var queryString =
            `select  sum(salaryTotal)
      from(
      select count(*) * r.salary  as salaryTotal from department as d join  role as r on d.id = r.department_id   join employee e on r.id = e.role_id 
      where d.id=?
      group by r.salary
      ) src`
        var queryValues = [id]
        orm.selectSql(queryString, queryValues, function (res) {
            cb(res);
        });
    },
    delete: function (condition, cb) {
        orm.delete("department", condition, function (res) {
            cb(res);
        });
    }
};

// Export the database functions for the controller (burgerController.js).
module.exports = burger;
