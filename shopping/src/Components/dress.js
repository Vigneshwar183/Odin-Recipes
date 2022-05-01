import React , { Component } from "react";
import '../styles/dress.css'

class Dress extends Component{
    constructor(){
        super();
        this.state={
            dress:null
        }
    }

    async componentDidMount(){
        const response = await fetch('https://5d76bf96515d1a0014085cf9.mockapi.io/product',{mode:'cors'})
        const tempData = await response.json()
        const dress = tempData.filter((item)=>{
            return !item.isAccessory
        })
        this.setState({
            dress:dress
        })
    }

    render(){
        return this.state.dress!==null?(
            <div className="Dresses">
                {this.state.dress.map(item=>
                <div className="dress">
                    <img src={item.preview} alt=''></img>
                    <p>{item.name}</p>
                </div>
                )}
            </div>
        ):<div>Loading</div>
    }
}

export default Dress