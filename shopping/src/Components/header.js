import React , { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/header.css"

class Header extends Component{
    render(){
        return(
            <div className="header">
                <div className="headerLeft">    
                    <Link to="/"><h1>Shop Lane</h1></Link>
                    <Link to="/dress"><div>Dress</div></Link>
                    <Link to="/accessories"><div>Accessories</div></Link>
                </div>
                <div className="headerSearch">
                    <input placeholder="Search"></input>
                </div>
                <div className="headerRight">
                    <div>cart</div>
                    <img alt="Profile"></img>
                </div>
            </div>
        )
    }
}

export default Header