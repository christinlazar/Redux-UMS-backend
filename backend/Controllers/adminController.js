
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const admiN = require('../models/adminModel')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const adminLogin = asyncHandler(async (req,res) =>{
    try {
        const {email ,password} = req.body
        console.log("emailand pwd",email,password)
        // await admiN.create({email:'admin@gmail.com',password:'admin123@'})
        const adminData = await admiN.findOne({email:email})
        console.log("admindata is",adminData)
        if(adminData && password == adminData.password){

            const userData = await User.find({})
            console.log(userData)

            res.status(201).json({
               email:adminData.email,
               token:generateToken(adminData._id),
               userData
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})

const deleteUser = asyncHandler (async (req,res) =>{
    console.log("getting in delete user")
      const userId = req.body.id
      const updatedUserList = await User.findOneAndDelete({_id:userId},{new:true})
      if(updatedUserList){
        userData = await User.find({})
        res.status(201).json({
            userData,
            token:req.token
        })
      }
        
})
const getUsers = asyncHandler(async(req,res)=>{
    console.log("getting in back end")
        const userData = await User.find({})
        if(userData){
            res.status(201).json({
                userData,
                token:req.token
            })
        }
        
})
const getUserToEdit = asyncHandler(async(req,res)=>{
   const userId = req.body.userId
   const user = await User.findById(userId)
   console.log(user)
   if(user){
    res.status(201).json({
        userData,
        editData:user,
        token:req.token
    })
   }
})
const updateUser = asyncHandler(async(req,res)=>{
        const userId = req.body.userId
        const userData = req.body.dataOfEditUser
        const updatedUser = await User.findOneAndUpdate({_id:userId},{$set:{
            name:userData.name,
            email:userData.email,
            phone:userData.phone
        }})
        if(updatedUser){
            const userData = await User.find()
            res.status(201).json({
                token:req.token,
                userData:userData
            })
        }
})
const createUser = asyncHandler(async(req,res)=>{
    const userData = req.body
    console.log(userData)
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(userData.password,salt)
        const createdUser = await User.create({
            name:userData.name,
            email:userData.email,
            password:hashedPassword,
            phone:userData.phone
        })
        console.log(createdUser)
        if(createdUser){
            const userData = await User.find({})
            console.log(userData)
            res.status(201).json({
                userData
            })
        }
})
const generateToken = (id) =>{
    return jwt.sign({id},process.env.ADMIN_TOKEN_SECRET,{expiresIn:'30d'})
}
module.exports = {
    adminLogin,
    deleteUser,
    getUsers,
    getUserToEdit,
    updateUser,
    createUser
}