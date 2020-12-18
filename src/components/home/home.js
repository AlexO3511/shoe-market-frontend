import React, {Component} from 'react'; 
import {Link} from 'react-router-dom';
import './home.css'

class Home extends Component {
    render(){
        const allShoes = this.props.shoes.map(shoe => {
            console.log(shoe.User.email)
            let contact = shoe.User.email
            return (
                <div className="shoes" key={shoe.id}>
                    <div className="shoe">
                    <p>
                    {shoe.brand}
                    {shoe.make}<br />
                    Retail: ${shoe.retailPrice}<br />
                    Value: ${shoe.value}<br />
                    <img src={shoe.imageLink}/><br />
                    Contact: {contact}
                    </p>
                    </div>
                </div>
            )
        })

        return(
            <div>
                <h1>
                    Kickz-R-Us
                </h1>
                <h3>Sign Up for updates on the latest releases!</h3>
                {allShoes}
            </div>
        )
    }
}

export default Home; 