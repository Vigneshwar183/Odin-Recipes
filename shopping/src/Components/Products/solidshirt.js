import React , {Component} from "react";
import '../../styles/product';

class SolidShirt extends Component{
    constructor(){
        super();
        this.state={
            solidShirt:null
        }
    }

    async componentDidMount(){
        const response = await fetch('https://5d76bf96515d1a0014085cf9.mockapi.io/product',{mode:'cors'})
        const tempData = await response.json();
        const solidShirt = tempData.filter((item)=>{
            return item.name==="solidShirt";
        })
        this.setState({
            solidShirt:solidShirt,
        })
    }

    render(){
        return this.state.solidShirt!==null?(
            <div className="Product">
                <img src={this.state.solidShirt.preview} alt=""></img>
                <p>Name:{this.state.solidShirt.name}</p>
                <p>Brand:{this.state.solidShirt.brand}</p>
                <p>Size:{this.state.solidShirt.size}</p>
                <p>Description:{this.state.solidShirt.description}</p>
                <p>Price:{this.state.solidShirt.price}</p>
            </div>
        ): <div>Loading</div>
    }
}

export default SolidShirt