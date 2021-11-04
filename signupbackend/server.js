const express= require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')

const cors=require('cors')
const routesUrls=require('./routes/routes')
dotenv.config()
const app=express()
mongoose.connect(process.env.DATABASE_ACCESS,()=> console.log("Database connected successfully"))
app.use(express.json())
app.use(cors())
app.use('/app',routesUrls)

app.listen(4000,()=> console.log(" server is running"))