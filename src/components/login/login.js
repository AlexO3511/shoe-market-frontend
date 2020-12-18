import React, {Component} from 'react'; 
import {Link} from 'react-router-dom';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import './login.css'

const backendURL = "http://localhost:3000/api"
class Login extends Component{
    // handleLogin = (event)=>{
    //     event.preventDefault()
    //     console.log()
    //     this.props.getLogin(event)
    //     this.props.history.push(`/users/profile/${this.props.currentUser}`)
    // }
    handleLogin = async (event) => {
        event.preventDefault()
        await axios.post(`${backendURL}/auth/login`, {
          username: event.target.username.value,
          password: event.target.password.value
        }).then((response)=>{
          console.log(response.data.token)
          let token = response.data.token
          let decoded = jwt_decode(token);
          console.log(decoded)


          this.props.history.push(`/users/profile/${decoded.id}`)
        })
      }


    render(){
        return(
        <div className="login">
        {/* <h1>Login</h1> */}
        <form onSubmit={this.handleLogin} >
        <h1>Login</h1>
            <input type ="text" name="username" placeholder="Enter Username"/>
            <input type ="text" name="password" placeholder="Enter Password"/>
            <input type = "submit" value="Login"/>
        </form>

        </div>
        )
    }
}

export default Login; 