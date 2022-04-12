import React , { Component } from "react";

class Footer extends Component{
    render(){
        return(
            <div className="parent">
                <div className="section1">
                    <h3>Online Store</h3>
                    <p>Dress</p>
                    <p>Shoes</p>
                </div>
                <div className="section2">
                    <h3>Helpful Links</h3>
                    <p>Home</p>
                    <p>About</p>
                    <p>Contact</p>
                </div>
                <div className="section3">
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