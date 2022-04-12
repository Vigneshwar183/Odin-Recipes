import React , { Component } from "react";
import "../styles/header.css"

class Header extends Component{
    render(){
        return(
            <div className="parent">
                <div className="headerLeft">    
                    <h1>Shop Lane</h1>
                    <div>Dress</div>
                    <div>Accessories</div>
                </div>
                <div className="headerRight">
                    <input placeholder="Search"></input>
                    <div>cart</div>
                    <img alt="Profile"></img>
                </div>
            </div>
        )
    }
}

export default Header