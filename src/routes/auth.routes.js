const express = require('express')
const router = express.Router()
const {
    userRegister,
    userLogin,
    userLogout,
    userDetails
} = require('../controllers/auth.controller')
const authenticate = require('../middleware/auth.middleware')

router.post('/register', userRegister)
router.post('/login', userLogin)
router.get('/me', authenticate, userDetails)
router.post("/logout", authenticate, userLogout);

module.exports = router