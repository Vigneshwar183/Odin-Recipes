import React , {Component} from "react";
import '../../styles/product';

class Airpods extends Component{
    constructor(){
        super();
        this.state={
            airpods:null
        }
    }

    async componentDidMount(){
        const response = await fetch('https://5d76bf96515d1a0014085cf9.mockapi.io/product',{mode:'cors'})
        const tempData = await response.json();
        const airpods = tempData.filter((item)=>{
            return item.name==="airpods";
        })
        this.setState({
            airpods:airpods,
        })
    }

    render(){
        return this.state.airpods!==null?(
            <div className="Product">
                <img src={this.state.airpods.preview} alt=""></img>
                <p>Name:{this.state.airpods.name}</p>
                <p>Brand:{this.state.airpods.brand}</p>
                <p>Size:{this.state.airpods.size}</p>
                <p>Description:{this.state.airpods.description}</p>
                <p>Price:{this.state.airpods.price}</p>
            </div>
        ): <div>Loading</div>
    }
}

export default Airpods