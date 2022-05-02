import React , {Component} from "react";
import '../../styles/product';

class GreenReflex extends Component{
    constructor(){
        super();
        this.state={
            greenReflex:null
        }
    }

    async componentDidMount(){
        const response = await fetch('https://5d76bf96515d1a0014085cf9.mockapi.io/product',{mode:'cors'})
        const tempData = await response.json();
        const greenReflex = tempData.filter((item)=>{
            return item.name==="greenReflex";
        })
        this.setState({
            greenReflex:greenReflex,
        })
    }

    render(){
        return this.state.greenReflex!==null?(
            <div className="Product">
                <img src={this.state.greenReflex.preview} alt=""></img>
                <p>Name:{this.state.greenReflex.name}</p>
                <p>Brand:{this.state.greenReflex.brand}</p>
                <p>Size:{this.state.greenReflex.size}</p>
                <p>Description:{this.state.greenReflex.description}</p>
                <p>Price:{this.state.greenReflex.price}</p>
            </div>
        ): <div>Loading</div>
    }
}

export default GreenReflex