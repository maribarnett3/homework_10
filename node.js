const employeeModule = require("./lib/employee");
// import {addEmployee } from "./lib/employee";
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
start()
// Do you want to add a team member? If so, choose a type:
// Manager, Engineer, Intern, I'm Done
function start() {
    // let finished = true;
    // while (finished) {
    inquirer.prompt([
        {
            type: "list",
            message: "Choose an employee type:",
            name: "type",
            choices: [
                "add department",
                "add role",
                "add employee",
                "view departments",
                "view roles",
                "view employees",
                "update employee role",
                "view employees by manager",
                "delete department",
                "delete role",
                "delete employee",
                "view department budget",
                "quit"
            ]
        }

    ]).then(response => {
        if (response.type === "quit") {
            console.log("closing application")
            // finished = false;
            // return
            process.exit(0);
        }
        if (response.type.indexOf("add") != -1)
            addRecord(response.type)
        else if (response.type.indexOf("view") != -1)
            viewRecords(response.type)
        else if (response.type.indexOf("delete") != -1)
            deleteRecord(response.type)
        else if (response.type.indexOf("update") != -1)
            updateRecord(response.type)
        else {
            console.log("unsuported choice. Try again.")
            start()
        }

    })
    // }



}
function addRecord(type) {
    // employeeModule
    if (type.indexOf("employee") != -1) {
        employeeModule.addEmployee().then(function (result) {

            start();
        })
            .catch(function (error) {
                console.log("Failed to add employee")
                console.log(error)
                start()
            })
    } else {
        start()
    }
}

function viewRecords(type) {
    // employeeModule
    if (type.indexOf("employee") != -1) {
        employeeModule.viewEmployees().then(function (result) {

            start();
        })
            .catch(function (error) {
                console.log("Failed to view employees")
                console.log(error)
                start()
            })
    } else {
        start()
    }
}

// createManager()
// ask all the manager questions, when done, go back to start()
// function createEmployee(employeeType) {
//   inquirer.prompt([
//     {
//       type: "input",
//       message: "Enter name:",
//       name: "name"
//     }
//   ]).then(genericResponses => {
//     if (employeeType === "manager") {
//       createManager(genericResponses)
//     }
//   });
// }
// function createManager(genericData) {
//   inquirer.prompt([
//     {
//       type: "input",
//       message: "Enter officeNumber:",
//       name: "officeNumber"

//     }
//   ]).then(response => {
//     // process all the answers
//     const managerObj = new Manager(genericData.name, genericData.email, response.officeNumber)
//     teamMembers.push(managerObj)
//     start();
//   })
// }

// function createIntern(genericData) {
//   inquirer.prompt([
//     {
//       type: "input",
//       message: "Enter school",
//       name: "school"

//     }
//   ]).then(response => {
//     // process all the answers
//     const internObj = new Intern(genericData.name, genericData.email, response.school)
//     teamMembers.push(internObj)
//     start();
//   })
// }

// function createEngineer(genericData) {
//   inquirer.prompt([
//     {
//       type: "input",
//       message: "Enter github:",
//       name: "github"

//     }
//   ]).then(response => {
//     // process all the answers
//     const engineerObj = new Engineer(genericData.name, genericData.email, response.github)
//     teamMembers.push(engineerObj)
//     start();
//   })
// }
// // STUDENT: This function will call the render function required near the top (line 12), 
// // and pass INTO it the teamMembers area; from there, write the HTML returned back to a file 
// // in a directory called output.
// function renderHtmlPage() {
//   const html = render(teamMembers)
//   // console.log(html)
//   if (!fs.existsSync(OUTPUT_DIR)) {
//     fs.mkdirSync(OUTPUT_DIR);
//   }
//   fs.writeFile(outputPath, html, err => {
//     // console.log(err)
//   })
// }