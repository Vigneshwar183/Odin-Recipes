import React , { Component } from "react";
import '../styles/footer.css'

class Footer extends Component{
    render(){
        return(
            <div className="footer">
                <div className="section">
                    <h3>Online Store</h3>
                    <p>Dress</p>
                    <p>Shoes</p>
                </div>
                <div className="section">
                    <h3>Helpful Links</h3>
                    <p>Home</p>
                    <p>About</p>
                    <p>Contact</p>
                </div>
                <div className="section">
                    <h3>Addres</h3>
                    <p>Building 101</p>
                    <p>Central Avenue</p>
                    <p>LA</p>
                    <p>US</p>
                </div>
            </div>
        )
    }
}

export default Footer