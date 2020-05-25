const inquirer = require("inquirer");
var employee = require("../models/employee.js");
var utilsModules = require("../utils/index.js");
const { parse } = require('json2csv');

var employeeModule = {
    addEmployee: function () {
        var stepEmployeePrompts = [
            {
                type: "input",
                name: "first_name",
                message: "What is your employee's First Name?",
                // Note how the validate function works
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character.";
                }
            },
            {
                type: "input",
                name: "last_name",
                message: "What is your employee's Last Name?",
                // Note how the validate function works
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character.";
                }
            },
            {
                type: "input",
                name: "role_id",
                message: "What is your employee's role id (can be empty)?"
            },
            {
                type: "input",
                name: "manager_id",
                message: "What is your employee's manager id (can be empty)?"
            },
        ]
        var stepSaveEmployee = function (response) {
            // grab orm
            // insert record
            // return response to call start
            var promise = new Promise(function (resolve, reject) {
                console.log("saving employee...")
                try {
                    var request = utilsModules.convertEmptyValuesToNull(response)
                    var cols = utilsModules.grabKeys(request)
                    var vals = utilsModules.grabVals(request)
                    employee.create(
                        cols,
                        vals,
                        function (res) {
                            console.log("created employee")
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
        //stepEmployeePrompts
        return inquirer.prompt(stepEmployeePrompts)
            .then(stepSaveEmployee);
        // var promise = new Promise(function(resolve, reject){

        // });
        // return promise;
    },
    viewEmployees: function () {
        var promise = new Promise(function (resolve, reject) {
            console.log("listing employees...")
            try {
                employee.all(function (data) {
                    // var hbsObject = {
                    //     employees: data
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

    deleteEmployee: function () {
        // var promise = new Promise(function (resolve, reject) {
        var stepEmployeePrompts = [
            {
                type: "input",
                name: "id",
                message: "What is your employee's id?",
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
                console.log("saving employee...")
                try {
                    var condition = "id = " + response.id;
                    employee.delete(
                        condition,

                        function (res) {
                            console.log("delete employee")
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
        //stepEmployeePrompts
        return inquirer.prompt(stepEmployeePrompts)
            .then(stepDelete);
        // })

        // return promise
    },

    updateEmployeeRole: function () {
        var stepEmployeePrompts = [
            {
                type: "input",
                name: "id",
                message: "What is your employee's id?",
                // Note how the validate function works
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character.";
                }
            },

            {
                type: "input",
                name: "role_id",
                message: "What is your employee's role id?",
                // Note how the validate function works
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character.";
                }
            },

        ]
        var stepUpdate = function (response) {
            // grab orm
            // insert record
            // return response to call start
            var promise = new Promise(function (resolve, reject) {
                console.log("saving employee...")
                try {
                    var condition = "id = " + response.id;
                    employee.update(
                        {
                            role_id: response.role_id
                        },
                        condition,

                        function (res) {
                            console.log("update employee")
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
        //stepEmployeePrompts
        return inquirer.prompt(stepEmployeePrompts)
            .then(stepUpdate);


    },

    updateEmployeemanager: function () {
        var stepEmployeePrompts = [
            {
                type: "input",
                name: "id",
                message: "What is your employee's id?",
                // Note how the validate function works
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character.";
                }
            },

            {
                type: "input",
                name: "manager_id",
                message: "What is your employee's manager id?",
                // Note how the validate function works
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character.";
                }
            },

        ]
        var stepUpdate = function (response) {
            // grab orm
            // insert record
            // return response to call start
            var promise = new Promise(function (resolve, reject) {
                console.log("saving employee...")
                try {
                    var condition = "id = " + response.id;
                    employee.update(
                        {
                            manager_id: response.manager_id
                        },
                        condition,

                        function (res) {
                            console.log("update employee")
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
        //stepEmployeePrompts
        return inquirer.prompt(stepEmployeePrompts)
            .then(stepUpdate);

    },

    viewEmployeesbyManager: function () {
        var stepEmployeePrompts = [


            {
                type: "input",
                name: "manager_id",
                message: "What is your employee's manager id?",
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
                console.log("saving employee...")
                try {
                    employee.selectWhere(

                        "manager_id",
                        response.manager_id,

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
        //stepEmployeePrompts
        return inquirer.prompt(stepEmployeePrompts)
            .then(stepview);
    }

}

// module.exports = {
//     addEmployee
// }
module.exports = employeeModule