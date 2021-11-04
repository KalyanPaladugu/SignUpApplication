# Signup Appliation using MERN(Mongodb,Express.Js,React.JS and Node.js)

+ For the Signup application i used ReactJS as frontend and Node.js, Epressjs used as backend and MongoDB for the Database

+ create main project folder as `SignupApplication`
+ First create react project using `npx create-react-app signupforntend` 
+ Create `signupbackend` folder for the backend with in the react application
+ First try to implement backend for the application,to achive that create `package.json file` in `signupbackend` folder using `npm init`. while creating it give description, entry point as `server.js` and author name
+ Opent terminal path like `SignupApplication\signupfrontend\signupbackend` and install backend required packages with command of `npm install express nodemon mongoose dotenv cors`
    + Express.js --> It is a back end web application framework for Node.js and it help you in creating server-side web applications faster and smarter
    + nodemon --> nodemon is a tool that helps develop node. js based applications by automatically restarting the node application when file changes in the directory are detected
    + `npm run start` or npm start will trigger the server to run when nodemon is installed for the backend
    + Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node. js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB
    + dotenv --> DotEnv is a lightweight npm package that automatically loads environment variables from a `.env` file into the process
    + cors -->  It is a mechanism to allow or restrict requested resources on a web server depend on where the HTTP request was initiated.Calling use(cors()) will enable the express server to respond to preflight requests


### worked on backend

+ create `server.js` file in signupbackend folder. Import express js and and assign to a app variable and give port number as 4000 to start the backend server
+ Open package.json file in signupbackend folder and change script as `"start":"nodemon server.js"` to start server through nodemon use `npm run start`

+ create a `routes` folder in signupbackend and create a `routes.js` for routing links and add content

```
const express=require('express')

const router=express.Router()

router.post('/signup',  (request,response)=>{
           response.send('send')
            
  })
    

module.exports=router  
```
+ To create model schema for the table in the database, create `models` folder in that create `SignUpModels.js`

+ Add schema code in `SignUpModel.js`
```
const mongoose=require('mongoose')


const signUpTemplate=new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    username:{
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
    date:{
        type: Date,
        default:Date.now
    }
})


module.exports=mongoose.model('mytable',signUpTemplate)

```
+ import schema from the `SignUpModels.js` to `route.js`
+ Add Schema to route.js file

```
const express=require('express')

const router=express.Router()
const signUpTemplateCopy=require('../models/SignUpModels')
const bcrypt=require('bcrypt')

router.post('/signup', async (request,response)=>{
        //   response.send('send')

        const saltPassword=await bcrypt.genSalt(10)
        const setPassword=await bcrypt.hash(request.body.password,saltPassword)
        
        const signedUpUser=new signUpTemplateCopy({
            fullName:request.body.fullName,
            username:request.body.username,
            email:request.body.email,
            password:setPassword
            

        })
        signedUpUser.save()
        .then(data=>response.json(data))
        .then(error=>response.json(error))
})

module.exports=router
```
+ Here post request will trigger when user enters all fileds in the form and clicked on submit or signup button 

+ Similarly i added encryption logic for the password by installing and usage of `bcrypt` package
+ By usnig `await` data will added to the database after password is encrypted 
+ For the database create a free account in mongoDB atlas (cloud) 
    + create a cluster with clustername
    + click `networkaccess` tab. In the IP whitelist click `add ip address` and select `allow connection from any ip address` make sure ip address should be `0.0.0.0/0`
    + Goto Database Acess option and click `add new database user`
    + Remember username and password for the user

+ After the cluser is updated goto cluster and click on `connect` then click on `connect your application` and copy the link 
+ Goto `server.js` to make a connection to database mongoose library can be used.For better way connection dotenv can be used

```
const express= require('express')
const app=express()
const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()
const cors=require('cors')

const routesUrls=require('./routes/routes')

mongoose.connect(process.env.DATABASE_ACCESS,()=> console.log("Database connected successfully"))
app.use(express.json())
app.use(cors())
app.use('/app',routesUrls)

app.listen(4000,()=> console.log(" server is running"))
```
+ For the database connection create `.env` file in `sigunupbackend` folder and add copied url from the Database. Change databse username,password and table name (which is written in SignUpModel.js) in the link
+ When the post request is triggered the router will send to server.js file with signup url.It will add as child url for the app parent link(/app/signup)

+ Initially pass static data to the database through `test.http` file. try to create `test.http` file in `signupbackend` folder and below code

```
POST  http://localhost:4000/app/signup
Content-Type: application/json

{
    "fullName":"Kalyan Ram",
    "username":"KalyanPaladugu",
    "email":"kalyan@gmail.com",
    "password":"user123"
}

```
+ Here we are send form data statically and then when we add forntend part we can submit data dynamically
+ Click on collection in database check data is added to the database
+ We successfully added data to the database through backend next switch to frontend

#### Do not stop backend server
### Worked on frontent

+ Open new terminal with path `SignupApplication\signupfrontend` 
+ For the frontend install bootstrap with command of `npm install bootstrap`
+ Import bootstrap links in app.js (which is class component,if not create class component app.js )
+ Add form with signup fields as below and try to implement `onChange` event for every input field
+ Add `onSubmit` logic to the button for storing the data in database install `axios` package
+ Here we created registered object it will take update data from the user and stored in the database
+ After submitting data change every filed as empty which is writen in `onSubmit` function with `seState` method
+ if you want to check password with out encryption there is no need to use `bcrypt` package

```
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
export class App extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             fullName:'',
             username:'',
             email:'',
             password:''

        }
    }

    // Methods 
    changeFullName = event => {
        this.setState({
            fullName:event.target.value 
        })
    }
    changeUserName = event => {
        this.setState({
            username:event.target.value 
        })
    }
    changeEmail = event => {
        this.setState({
            email:event.target.value 
        })
    }
    changePassword = event => {
        this.setState({
            password:event.target.value 
        })
    }
    

    onSubmit=event =>{
        event.preventDefault();
        const registered={
            fullName:this.state.fullName,
            username:this.state.username,
            email:this.state.email,
            password:this.state.password
        }
        axios.post('http://localhost:4000/app/signup',registered).
        then(response => console.log(response.data))
        this.setState({
            fullName:'',
             username:'',
             email:'',
             password:''
        })
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="form-div">
                            <form onSubmit={this.onSubmit}>
                                <input type="text" placeholder="Enter Full Name"
                                onChange={this.changeFullName}
                                value={this.state.fullName}
                                className="form-control form-group" />

                                <input type="text" placeholder="Enter User Name"
                                onChange={this.changeUserName}
                                value={this.state.username}
                                className="form-control " />

                                <input type="email" placeholder="Enter Email Id"
                                onChange={this.changeEmail}
                                value={this.state.email}
                                className="form-control " />

                                <input type="password" placeholder="Enter Password"
                                onChange={this.changePassword}
                                value={this.state.password}
                                className="form-control form-group" />

                                <input type="submit" value="Submit" 
                                className="btn btn-danger btn-block" />

                            </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default App
```