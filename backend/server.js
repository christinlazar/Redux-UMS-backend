
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config();
const path = require('path')
const PORT = process.env.PORT
const connectDB  = require('./config/db')
const {errorHandler} = require('./Middleware/errorHandler')
const userRoute = require('./Routes/userRoute')
const adminRoute = require('./Routes/adminRoute')
connectDB()
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/backend/assets',express.static(path.join(__dirname,'./assets')))
app.use('/api/users',userRoute)
app.use('/api/admin',adminRoute)
app.use(errorHandler)
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}` )
})