import React , { Component } from "react";

class Accessories extends Component{
    constructor(){
        super();
        this.state={
            accessories:null
        }
    }

    async componentDidMount(){
        const response = await fetch('https://5d76bf96515d1a0014085cf9.mockapi.io/product',{mode:'cors'})
        const tempData = await response.json()
        const accessories = tempData.filter((item)=>{
            return item.isAccessory
        })
        this.setState({
            accessories:accessories
        })
    }

    render(){
        return(
            <div className="Accessories">
                {this.state.accessories.map(item=>
                    <div className="accessory">
                        <img src={item.preview} alt=''></img>
                        <p>{item.name}</p>
                    </div>
                )}
            </div>
        )
    }
}

export default Accessories