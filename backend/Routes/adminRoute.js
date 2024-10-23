const express = require('express')
const router = express.Router()
const {AdminAuth} = require('../Middleware/adminAuth')
const {
    adminLogin,
    deleteUser,
    getUsers,
    getUserToEdit,
    updateUser,
    createUser
} = require('../Controllers/adminController')


router.post('/adminlogin',adminLogin)
router.post('/deleteuser',AdminAuth,deleteUser)
router.get('/getusers',AdminAuth,getUsers)
router.post('/getusertoedit',AdminAuth,getUserToEdit)
router.post('/updateuser',AdminAuth,updateUser)
router.post('/createuser',AdminAuth,createUser)


module.exports = router