const inquirer = require("inquirer");
var department = require("../models/department.js");
var utilsModules = require("../utils/index.js");
const { parse } = require('json2csv');

var departmentModule = {
    adddepartment: function () {
        var stepdepartmentPrompts = [
            {
                type: "input",
                name: "name",
                message: "What is your department's name?",
                // Note how the validate function works
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character.";
                }
            },
            
        ]
        var stepSavedepartment = function (response) {
            // grab orm
            // insert record
            // return response to call start
            var promise = new Promise(function (resolve, reject) {
                console.log("saving department...")
                try {
                    var request = utilsModules.convertEmptyValuesToNull(response)
                    var cols = utilsModules.grabKeys(request)
                    var vals = utilsModules.grabVals(request)
                    department.create(
                        cols,
                        vals,
                        function (res) {
                            console.log("created department")
                            resolve(res)
                        }
                    )
                    // resolve("Ok")

                } catch (error) {
                    reject(new Error(error));
                }
                // ...
            });
            return promise;
        }
        //stepdepartmentPrompts
        return inquirer.prompt(stepdepartmentPrompts)
            .then(stepSavedepartment);
        // var promise = new Promise(function(resolve, reject){

        // });
        // return promise;
    },
    viewdepartments: function () {
        var promise = new Promise(function (resolve, reject) {
            console.log("listing departments...")
            try {
                department.all(function (data) {
                    // var hbsObject = {
                    //     departments: data
                    // };
                    if (data && data.length > 0) {
                        var fields = utilsModules.grabKeys(data[0])
                        const opts = { fields, quote: '' };

                        try {
                            const csv = parse(data, opts);
                            console.log(csv);
                        } catch (err) {
                            console.error(err);
                        }

                    }
                    // res.render("index", hbsObject);
                    resolve("Ok")
                });


            } catch (error) {
                reject(new Error(error));
            }
            // ...
        });
        return promise;

    },

    deletedepartment: function () {
        // var promise = new Promise(function (resolve, reject) {
        var stepdepartmentPrompts = [
            {
                type: "input",
                name: "id",
                message: "What is your department's id?",
                // Note how the validate function works
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character.";
                }
            },

        ]
        var stepDelete = function (response) {
            // grab orm
            // insert record
            // return response to call start
            var promise = new Promise(function (resolve, reject) {
                console.log("saving department...")
                try {
                    var condition = "id = " + response.id;
                    department.delete(
                        condition,

                        function (res) {
                            console.log("delete department")
                            resolve(res)
                        }
                    )
                    // resolve("Ok")

                } catch (error) {
                    reject(new Error(error));
                }
                // ...
            });
            return promise;
        }
        //stepdepartmentPrompts
        return inquirer.prompt(stepdepartmentPrompts)
            .then(stepDelete);
        // })

        // return promise
    },

    viewdepartmentBudget: function () {
        var stepdepartmentPrompts = [


            {
                type: "input",
                name: "id",
                message: "What is your department's id?",
                // Note how the validate function works
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character.";
                }
            },

        ]
        var stepview = function (response) {
            // grab orm
            // insert record
            // return response to call start
            var promise = new Promise(function (resolve, reject) {
                console.log("saving department...")
                try {
                    department.getBudget(
                        response.id,

                        function (data) {
                            if (data && data.length > 0) {
                                var fields = utilsModules.grabKeys(data[0])
                                const opts = { fields, quote: '' };
        
                                try {
                                    const csv = parse(data, opts);
                                    console.log(csv);
                                } catch (err) {
                                    console.error(err);
                                }
        
                            }
                            // res.render("index", hbsObject);
                            resolve("Ok")
                        }
                    )
                    // resolve("Ok")

                } catch (error) {
                    reject(new Error(error));
                }
                // ...
            });
            return promise;
        }
        //stepdepartmentPrompts
        return inquirer.prompt(stepdepartmentPrompts)
            .then(stepview);
    }

}

// module.exports = {
//     adddepartment
// }
module.exports = departmentModule