
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
    type:String
    },
    phone:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model('User',userSchema)