const router = require('express').Router()
const userController = require('../controllers/user')

router.get("/getUsers", userController.getAllUsers)

router.post("/createUser", userController.createUser)


module.exports = router