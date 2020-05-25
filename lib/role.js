const inquirer = require("inquirer");
var role = require("../models/role.js");
var utilsModules = require("../utils/index.js");
const { parse } = require('json2csv');

var roleModule = {
    addrole: function () {
        var steprolePrompts = [
            {
                type: "input",
                name: "name",
                message: "What is your role's name?",
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
                name: "salary",
                message: "What is your role's salary?",
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
                name: "department_id",
                message: "What is your role's department id?",
                // Note how the validate function works
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character.";
                }
            },
            
        ]
        var stepSaverole = function (response) {
            // grab orm
            // insert record
            // return response to call start
            var promise = new Promise(function (resolve, reject) {
                console.log("saving role...")
                try {
                    var request = utilsModules.convertEmptyValuesToNull(response)
                    var cols = utilsModules.grabKeys(request)
                    var vals = utilsModules.grabVals(request)
                    role.create(
                        cols,
                        vals,
                        function (res) {
                            console.log("created role")
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
        //steprolePrompts
        return inquirer.prompt(steprolePrompts)
            .then(stepSaverole);
        // var promise = new Promise(function(resolve, reject){

        // });
        // return promise;
    },
    viewroles: function () {
        var promise = new Promise(function (resolve, reject) {
            console.log("listing roles...")
            try {
                role.all(function (data) {
                    // var hbsObject = {
                    //     roles: data
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

    deleterole: function () {
        // var promise = new Promise(function (resolve, reject) {
        var steprolePrompts = [
            {
                type: "input",
                name: "id",
                message: "What is your role's id?",
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
                console.log("saving role...")
                try {
                    var condition = "id = " + response.id;
                    role.delete(
                        condition,

                        function (res) {
                            console.log("delete role")
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
        //steprolePrompts
        return inquirer.prompt(steprolePrompts)
            .then(stepDelete);
        // })

        // return promise
    },


}

// module.exports = {
//     addrole
// }
module.exports = roleModule