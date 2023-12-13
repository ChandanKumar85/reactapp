const Employee = require('../models/Employee')

// Show the list of Employee
const index = (req, res, next) => {
    if (req.query.page && req.query.limit) {
        Employee.paginate({}, { page: req.query.page, limit: req.query.limit })
            .then(response => {
                res.json({
                    response
                })
            })
            .catch(error => {
                res.json({
                    message: 'An error Occurred!' + error
                })
            })
    } else {
        Employee.find()
            .then(response => {
                res.json({
                    response
                })
            })
            .catch(error => {
                res.json({
                    message: 'An error Occurred!' + error
                })
            })
    }
    // Employee.find()
    // .then(response => {
    //     res.json({
    //         response
    //     })
    // })
    // .catch(error => {
    //     res.json({
    //         message: 'An error Occured!'
    //     })
    // })
}

// Show single employee
const show = (req, res, next) => {
    let employeeID = req.body.employeeID
    Employee.findById(employeeID)
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: 'An error Occurred!'
            })
        })
}

// add new employee
const store = (req, res, next) => {
    let employee = new Employee({
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    })
    if (req.file) {
        employee.avatar = req.file.path
    }
    // if (req.files) {
    //     let path = ''
    //     req.files.forEach(function (files, index, arr) {
    //         path = path + files.path + ','
    //     })
    //     path = path.substring(0, path.lastIndexOf(','))
    //     employee.avatar = path
    // }
    employee.save()
        .then(response => {
            res.json({
                message: 'Employee Added Successfully!', response: response
            })
        })
        .catch(error => {
            res.json({
                message: 'An error Occurred!', error: error
            })
        })
}

// update an employee
const update = (req, res, next) => {
    let employeeID = req.body.employeeID

    let updatedData = {
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    }

    Employee.findByIdAndUpdate(employeeID, { $set: updatedData })
        .then(() => {
            res.json({
                message: 'Employee updated successfully'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error Occurred!'
            })
        })
}

// Delete an employee
const destroy = (req, res, index) => {
    let employeeID = req.body.employeeID
    Employee.findByIdAndRemove(employeeID)
        .then(() => {
            res.json({
                message: 'Employee deleted successfully!'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error Occurred!'
            })
        })
}

module.exports = {
    index, show, store, update, destroy
}