import Axios from 'axios';
import React, {Component} from 'react'; 
import {Link} from 'react-router-dom';
import axios from 'axios';
import './Profile.css'


const backendURL = "http://localhost:3000/api"
let userData = []
let userShoes = []

class Profile extends Component {
    
    componentWillMount = () => {
        console.log('We working')
        console.log(this.props.match.params.id)
        this.getProfile()
      }

      getProfile = async () => {
        const response = await axios.get(`${backendURL}/users/profile/${this.props.match.params.id}`)
        console.log(response)
        userData = response.data.user
        userShoes = response.data.user.Shoes
        console.log('next')
        console.log(userShoes)
        // console.log(userData.user.name)
      }
      refreshPage = () =>{
        window.location.reload(false)
    }

      addShoe = async (event) => {
        event.preventDefault()
        await axios.post(`${backendURL}/shoes`,{
          brand: event.target.brand.value,
          make: event.target.make.value,
          size: event.target.make.value,
          colorway: event.target.colorway.value,
          retailPrice: event.target.retailPrice.value,
          value: event.target.value.value,
          imageLink: event.target.imageLink.value,
          userId: event.target.userId.value,
    
        })
        this.getProfile()
        this.refreshPage()
      }

      deleteShoe = async(event) => {
          event.preventDefault()
          let shoeId = event.target.id
          await axios.delete(`${backendURL}/shoes/${shoeId}`)

          this.getProfile()
          this.refreshPage()
      }

      updateProfile = async(event) => {
          event.preventDefault()
          await axios.put(`${backendURL}/users/${this.props.match.params.id}`,{
            username: event.target.username.value,
            password: event.target.password.value,
            email: event.target.email.value
          })
          this.getProfile()
          this.refreshPage()
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
        const name = userData.name
        const username = userData.username
        const email = userData.email
        const password = userData.password

        const myShoes = userData.Shoes

        const myCollection = userShoes.map(shoe => {
            return(
                <div className="shoes" key={shoe.id}>
                  <div className="shoe">
                    <p>
                    {shoe.brand} 
                    {shoe.make} <br />
                    Retail: ${shoe.retailPrice} <br />
                    Value: ${shoe.value} <br />
                    <img src={shoe.imageLink}/> <br />
                    <button key={shoe.id} id={shoe.id} onClick={this.deleteShoe}>
                        Delete Shoe
                    </button>
                    </p>
                    </div>
                </div>
            )
        })
       


        return(
            <div>
                <h1>Welcome to {name}'s Profile Page</h1>
                <h3>Your Info</h3>

                <div className="info">
                    <form onSubmit={this.updateProfile}>
                    <div class="form-row">

                    <div class="form-group col-md-6">
                    <label for="inputUsername4">Username</label>
                    <input type="text" class="form-control" id="inputUsername4" name= "username" defaultValue = {username} />
                    </ div>
                    
                    <div class="form-group col-md-6">
                      <label for="inputEmail4">Contact</label>
                      <input type="text" class="form-control" id="inputEmail4" name="email" defaultValue ={email} /> 
                    </div>

                    <div class="form-group col-md-6">
                      <label for="inputPassword4">Password</label>
                      <input type="text" class="form-control" id="inputPassword" name="password" defaultValue ={password} /> 
                    </div>
                    </div>
                    <input type="submit" value="Update Info"/>

                    </form>
                
                </div> <br />
                <h2>My Collection</h2>
                <div>
                <h3>Add Shoe</h3>
                    <form onSubmit={this.addShoe}>
                      <div class="form-row">
                        <input type="hidden" name="userId" value = {this.props.match.params.id} />

                        <div class="form-group col-md-6">
                          <label for="inputBrand4">Brand</label>
                          <input type="text" class="form-control" id="inputUsername4" name= "brand" />
                        </ div>

                        <div class="form-group col-md-6">
                          <label for="inputMake4">Make</label>
                          <input type="text" class="form-control" id="inputMake4" name= "make" />
                        </ div>

                        <div class="form-group col-md-6">
                          <label for="inputSize4">Size</label>
                          <input type="text" class="form-control" id="inputSize4" name= "size" />
                        </ div>

                        <div class="form-group col-md-6">
                          <label for="inputSize4">Colorway</label>
                          <input type="text" class="form-control" id="inputColorway4" name= "colorway" />
                        </ div>

                        <div class="form-group col-md-6">
                          <label for="inputRetailPrice4">Retail Price</label>
                          <input type="integer" class="form-control" id="inputRetailPrice4" name= "retailPrice" />
                        </ div>

                        <div class="form-group col-md-6">
                          <label for="inputValue4">Value</label>
                          <input type="text" class="form-control" id="inputValue4" name= "value" />
                        </ div>

                        <div class="form-group col-md-6">
                          <label for="inputLinkImage4">Image</label>
                          <input type="text" class="form-control" id="inputImageLink4" name= "imageLink" />
                        </ div>
                       </div>
                        <input type="submit" value="Add Shoe" />
                    </form>
                </div>
                {myCollection}
            </div>
        )
    }
}

export default Profile; 