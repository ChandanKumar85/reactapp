const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


// Show single employee
const show = (req, res, next) => {
    let userID = req.body.userID
    User.findById(userID)
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

// update an employee
const update = (req, res, next) => {
    let userID = req.body.userID
    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
        if (err) {
            res.json({
                error: err
            })
        }
        let updatedData = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPass
        }
        User.findByIdAndUpdate(userID, { $set: updatedData })
            .then(() => {
                res.json({
                    message: 'User updated successfully'
                })
            })
            .catch(error => {
                res.json({
                    message: 'An error Occurred!'
                })
            })
    })
}

// Delete an employee
const destroy = (req, res, index) => {
    let userID = req.body.userID
    User.findByIdAndRemove(userID)
        .then(() => {
            res.json({
                message: 'User deleted successfully!'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error Occurred!'
            })
        })
}




// Add User
const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
        if (err) {
            return res.json({
                error: err
            })
        }
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPass
        })
        user.save()
            .then(user => {
                if (user) {
                    let token = jwt.sign({ name: user.name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME })
                    let refreshtoken = jwt.sign({ name: user.name }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME })
                    return res.json({
                        message: 'LOGIN_SUCCESSFUL',
                        user: user,
                        token,
                        refreshtoken
                    })
                }
                return res.json({
                    message: 'USER_ADDED_SUCCESSFULLY'
                })
            })
            .catch(error => {
                return res.json({
                    message: 'An error occurred!'
                })
            })
    })
}


// Login Method
const login = (req, res, next) => {
    var username = req.body.email
    var password = req.body.password
    User.findOne({ $or: [{ email: username }, { phone: username }] })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
                        return res.json({
                            error: err
                        })
                    }
                    if (result) {
                        let token = jwt.sign({ name: user.name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME })
                        let refreshtoken = jwt.sign({ name: user.name }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME })
                        return res.json({
                            message: 'Login Successful!',
                            user: user,
                            // result,
                            token,
                            refreshtoken
                        })
                    } else {
                        return res.json({
                            message: 'PASSWORD_NOT_MATCHED'
                        })
                    }
                })
            } else {
                return res.json({
                    message: 'NO_USER_FOUND'
                })
            }
        })
}


// Get RefreshToken
const refreshToken = (req, res, next) => {
    const refreshToken = req.body.refreshToken
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
        if (err) {
            res.status(400).json({
                err
            })
        }
        else {
            let token = jwt.sign({ name: decode.name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME })
            let refreshToken = req.body.refreshToken
            res.status(200).json({
                message: "Token refreshed successfully!",
                token,
                refreshToken
            })
        }
    })
}

module.exports = {
    register,
    show,
    update,
    destroy,
    login, refreshToken
}