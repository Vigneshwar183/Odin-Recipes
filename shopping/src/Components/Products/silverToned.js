import React , {Component} from "react";
import '../../styles/product';

class SilverToned extends Component{
    constructor(){
        super();
        this.state={
            silverToned:null
        }
    }

    async componentDidMount(){
        const response = await fetch('https://5d76bf96515d1a0014085cf9.mockapi.io/product',{mode:'cors'})
        const tempData = await response.json();
        const silverToned = tempData.filter((item)=>{
            return item.name==="silverToned";
        })
        this.setState({
            silverToned:silverToned,
        })
    }

    render(){
        return this.state.silverToned!==null?(
            <div className="Product">
                <img src={this.state.silverToned.preview} alt=""></img>
                <p>Name:{this.state.silverToned.name}</p>
                <p>Brand:{this.state.silverToned.brand}</p>
                <p>Size:{this.state.silverToned.size}</p>
                <p>Description:{this.state.silverToned.description}</p>
                <p>Price:{this.state.silverToned.price}</p>
            </div>
        ): <div>Loading</div>
    }
}

export default SilverToned