import React , {Component} from "react";
import '../../styles/product';

class Sweatshirt extends Component{
    constructor(){
        super();
        this.state={
            sweatshirt:null
        }
    }

    async componentDidMount(){
        const response = await fetch('https://5d76bf96515d1a0014085cf9.mockapi.io/product',{mode:'cors'})
        const tempData = await response.json();
        const sweatshirt = tempData.filter((item)=>{
            return item.name==='sweatshirt';
        })
        this.setState({
            sweatshirt:sweatshirt,
        })
    }

    render(){
        return this.state.sweatshirt!==null?(
            <div className="Product">
                <img src={this.state.sweatshirt.preview} alt=""></img>
                <p>Name:{this.state.sweatshirt.name}</p>
                <p>Brand:{this.state.sweatshirt.brand}</p>
                <p>Size:{this.state.sweatshirt.size}</p>
                <p>Description:{this.state.sweatshirt.description}</p>
                <p>Price:{this.state.sweatshirt.price}</p>
            </div>
        ): <div>Loading</div>
    }
}

export default Sweatshirt