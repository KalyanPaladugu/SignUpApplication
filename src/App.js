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
