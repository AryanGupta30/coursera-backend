const router = require('express').Router()
const userController = require('../controllers/user')

router.get("/getUsers", userController.getAllUsers)

module.exports = router