import React , {Component} from "react";
import '../../styles/product';

class Leather extends Component{
    constructor(){
        super();
        this.state={
            leather:null
        }
    }

    async componentDidMount(){
        const response = await fetch('https://5d76bf96515d1a0014085cf9.mockapi.io/product',{mode:'cors'})
        const tempData = await response.json();
        const leather = tempData.filter((item)=>{
            return item.name==="leather";
        })
        this.setState({
            leather:leather,
        })
    }

    render(){
        return this.state.leather!==null?(
            <div className="Product">
                <img src={this.state.leather.preview} alt=""></img>
                <p>Name:{this.state.leather.name}</p>
                <p>Brand:{this.state.leather.brand}</p>
                <p>Size:{this.state.leather.size}</p>
                <p>Description:{this.state.leather.description}</p>
                <p>Price:{this.state.leather.price}</p>
            </div>
        ): <div>Loading</div>
    }
}

export default Leather