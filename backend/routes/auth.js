const express = require('express');
const router = express.Router()

const AuthController = require('../controllers/AuthController')

router.post('/register', AuthController.register)

router.post('/login', AuthController.login)
router.post('/show', AuthController.show)
router.post('/update', AuthController.update)
router.post('/delete', AuthController.destroy)

router.post('/refresh-token', AuthController.refreshToken)

module.exports = router