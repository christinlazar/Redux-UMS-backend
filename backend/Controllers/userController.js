const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

const getUser = asyncHandler ( async (req,res)=>{
    const {_id,name} = await User.findById(req.user.id)
    res.status(200).json({
        id:_id,
        name:name
    })
})

const register = asyncHandler (async (req,res) =>{
  console.log(req.body)
   const {name,email,password,phone} = req.body
   console.log(req.body)
   if(!name||!email||!password||!phone){
    res.status(400)
    throw new Error('please add all fields')
   }
   const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
   if(existingUser){
    res.status(400)
    throw new Error('user already exists')
   }
   const salt = await bcrypt.genSalt(10)
   const hashedPassword = await bcrypt.hash(password,salt)
   const imageUrl = "https://i.pinimg.com/564x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"
   const user = await User.create({
    name,
    email,
    password:hashedPassword,
    image:imageUrl,
    phone
   })
   if(user){
    res.status(201).json({
        name:user.name,
        email:user.email,
        phone:user.phone,
        image:user.image,
        token:generateToken(user._id)
    })
   }else{
    res.status(400)
    throw new Error('was not able to add user')
   }
})

const loginUser = asyncHandler (async (req,res) =>{
  console.log("logging in")
  const {email,password} = req.body
  const user = await User.findOne({email})
  console.log(user);
  if(user && (await bcrypt.compare(password,user.password))){
    console.log("success")
    res.status(201).json({
        name:user.name,
        email:user.email,
        phone:user.phone,
        image:user.image,
        token:generateToken(user._id)
    })
  }else{
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

const updateUser = asyncHandler(async (req,res) =>{
  try {
    const {name,email,phone} = req.body
    const image = req.file
    console.log(image)
    if(image!== undefined){
      const updated = await User.findOneAndUpdate({_id:req.user},{$set:{
        name:name,
        email:email,
        phone:phone,
        image:"http://localhost:5000/backend/assets/"+image.filename
      }},{new:true})
      if(updated ){
        res.json({
          name,
          email,
          phone,
          image:updated.image
        })
      }
  
    }else{
      const updated = await User.findOneAndUpdate({_id:req.user},{$set:{
        name:name,
        email:email,
        phone:phone,
      }})
      if(updated ){
        res.json({
          name,
          email,
          phone,
          image:updated.image
        })
      }
  
    }
  } catch (error) {
    console.log(error.message)
  }
})

const generateToken = (id) =>{
    return jwt.sign({ id },process.env.TOKEN_SECRET,{expiresIn:'30d'})
}

// const deleteUser = asyncHandler (async (req,res) =>{
//     res.status(200).json({message:`deleted a user of id ${req.params.id}`})
// })

module.exports = {
    getUser,
    register,
    loginUser,
    updateUser
}