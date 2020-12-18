import React, {Component} from 'react'; 
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './signup.css'

class Signup extends Component{
    handleSignUp = (event) =>{
        event.preventDefault()
        this.props.postSignUp(event)
        this.props.history.push('/login')
    }
    // handleLogin = (event)=>{
    //     event.preventDefault()
    //     console.log()
    //     this.props.getLogin(event)
    //     this.props.history.push(`/users/profile/${this.props.currentUser}`)
    // }
    render(){
        return(
            <div className="SignUp">
                <h1>Welcome to Kickz-R-Us! Sign Up</h1>
                <form onSubmit={this.handleSignUp}>

                <div class="form-group row justify-content-center" >
                
                    <div class="col-sm-10">
                        <input type ="text" name="name" class="form-control" id="inputEmail3" placeholder="Email"/>
                    </div>
                </div>

                <div class="form-group row justify-content-center">
                
                    <div class="col-sm-10">
                        <input type ="text" name="username" class="form-control" id="inputUsername3" placeholder="Username"/>
                    </div>
                </div>

                <div class="form-group row justify-content-center">
                
                    <div class="col-sm-10">
                        <input type ="text" name="password" class="form-control" id="inputPassword3" placeholder="Password"/>
                    </div>
                </div>

                <div class="form-group row justify-content-center">
                
                    <div class="col-sm-10">
                        <input type ="text" name="email" class="form-control" id="inputEmail3" placeholder="Email"/>
                    </div>
                </div>

                {/* Username: <input type="text" name="username" />
                Password: <input type="text" name="password" />
                Email: <input type="text" name="email" /> */}

                <input type="submit" value="SignUp" />
                

                </form>
            </div>
        )

    }
}

export default Signup; 