const jwt = require('jsonwebtoken')
const Admin = require('../models/adminModel')
const asyncHandler = require('express-async-handler')



const AdminAuth = asyncHandler(async (req,res,next)=>{
let token;
if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try {
        token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token,process.env.ADMIN_TOKEN_SECRET)
        req.admin = await Admin.findById(decoded.id).select('-password')
        console.log(req.admin)
        req.token = token;
        next()
    } catch (error) {
        res.status(401)
        throw new Error('something went wrong')
    }
}
if(!token){
    res.status(401)
    throw new Error('Not authorized')
}
})

module.exports = {
    AdminAuth
}