const express = require('express')
const router = express.Router()
const {Auth} = require('../Middleware/userAuth')
const upload = require('../utils/multer')
const {
    getUser,
    register,
    loginUser,
    updateUser
} = require ('../Controllers/userController')

// router.get('/me',Auth,getUser)
router.post('/',register)
router.post('/login',loginUser)
router.post('/updateUser',Auth,upload.single('image'),updateUser)

module.exports = router
