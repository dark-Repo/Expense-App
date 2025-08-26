const express = require('express')
const { loginController, registerController } = require('../controllers/userController')

//route object
const router = express.Router()
//routers
//POST|| LOGIN
router.post('/login', loginController)

//POST|| register user
router.post('/register', registerController)

module.exports = router