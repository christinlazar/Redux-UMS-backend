
const mongoose = require('mongoose')

const connectDB =  async () =>{
    try {
        const conn = await mongoose.connect("mongodb://localhost:27017/usermanagementsystem")
        console.log(`Data-base Connected ${conn}`.cyan.underline)
    } catch (error) {
        console.log(error.message).
        process.exit(1)
    }
}
module.exports = connectDB
  