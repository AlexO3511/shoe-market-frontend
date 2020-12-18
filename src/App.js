import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react'; 
import axios from 'axios';
import {Route, Link, Switch} from 'react-router-dom';
import Home from './components/home/home'
import Login from './components/login/login'
import SignUp from './components/signup/signup'
import Profile from './components/myProfile/myProfile'
import EditProfile from './components/myProfile/editProfile'
import jwt_decode from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';

const backendURL = "http://localhost:3000/api"

class App extends Component {
  constructor(){
    super()

    this.state = {
      shoes:[],
      currentUser:[]
    }
  }

  componentDidMount = () => {
    this.getShoes()
  }

  getShoes = async () => {
    const response = await axios(`${backendURL}/shoes`)
    this.setState({
      shoes: response.data.allShoes
    })
  }

  addShoe = async (event) => {
    event.preventDefault()
    await axios.post(`${backendURL}/shoes`,{
      brand: event.target.brand.value,
      make: event.target.make.value,
      colorway: event.target.colorway.value,
      retailPrice: event.target.retailPrice.value,
      value: event.target.value.value,
      imageLink: event.target.imageLink.value,
      userId: event.target.userId.value,

    })
  }

  getLogin = async (event) => {
    event.preventDefault()
    await axios.post(`${backendURL}/auth/login`, {
      username: event.target.username.value,
      password: event.target.password.value
    }).then((response)=>{
      console.log(response.data.token)
      let token = response.data.token
      let decoded = jwt_decode(token);
      console.log(decoded)
      this.setState({
        currentUser: decoded.id
      })
      console.log(this.state)
      
    })
  }

  getProfile = async (event) => {
    event.preventDefault()
    await axios.get(`${backendURL}/users`)
  }

  postSignUp = async (event) => {
    event.preventDefault()

    await axios.post(`${backendURL}/auth/signup`,{
      name: event.target.name.value, 
      username: event.target.username.value,
      password: event.target.password.value,
      email: event.target.email.value
    })
  }

  
  render(){
    return (
      <div className="App">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Nav>
        <Nav.Link><Link to = '/'>Market Place</Link></Nav.Link>
        <Nav.Link><Link to = '/login'>Login</Link></Nav.Link>
        <Nav.Link><Link to = '/signup'>Sign Up</Link></Nav.Link>
        </Nav>
        </Navbar>
        <main>
          <Switch>
            <Route exact path='/'
            component={()=> <Home shoes ={this.state.shoes}/>} />

            < Route path='/login'
            component={(routerProps)=> <Login {...routerProps} getLogin={this.getLogin}/>} />

            < Route path ='/signup'
            component={(routerProps)=> <SignUp {...routerProps} postSignUp={this.postSignUp}/>} />

            <Route path ='/users/profile/:id'
            component={(routerProps)=> <Profile id = {this.state.currentUser} {...routerProps}/>} />

            <Route path ='/users/profile/edit/:id' 
            component={(routerProps)=> <EditProfile {...routerProps}/>} />
          </Switch>
        </main>
   
      </div>
    );
  }
  }

export default App;
