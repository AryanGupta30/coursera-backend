const router = require('express').Router()
const userController = require('../controllers/user')

router.get("/getUsers", userController.getAllUsers)

router.post("/createUser", userController.createUser)
router.post('/login', userController.loginUser);

module.exports = router