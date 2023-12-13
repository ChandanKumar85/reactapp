const express = require('express')
const router = express.Router()

const EmployeeController = require('../controllers/EmployeeControllers')
const upload = require('../middleware/upload')
const authenticate = require('../middleware/authenticate')
// authenticate,
router.get('/', EmployeeController.index)
router.post('/show', EmployeeController.show)
// router.post('/store', authenticate, upload.array('avatar[]'), EmployeeController.store)
router.post('/store', authenticate, upload.single('avatar'), EmployeeController.store)
router.post('/update', authenticate, EmployeeController.update)
router.post('/delete', authenticate, EmployeeController.destroy)

module.exports = router