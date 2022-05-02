import React , {Component} from "react";
import '../../styles/product';

class Sweatsporty extends Component{
    constructor(){
        super();
        this.state={
            sweatsporty:null
        }
    }

    async componentDidMount(){
        const response = await fetch('https://5d76bf96515d1a0014085cf9.mockapi.io/product',{mode:'cors'})
        const tempData = await response.json();
        const sweatsporty = tempData.filter((item)=>{
            return item.name==="sweatsporty";
        })
        this.setState({
            sweatsporty:sweatsporty,
        })
    }

    render(){
        return this.state.sweatsporty!==null?(
            <div className="Product">
                <img src={this.state.sweatsporty.preview} alt=""></img>
                <p>Name:{this.state.sweatsporty.name}</p>
                <p>Brand:{this.state.sweatsporty.brand}</p>
                <p>Size:{this.state.sweatsporty.size}</p>
                <p>Description:{this.state.sweatsporty.description}</p>
                <p>Price:{this.state.sweatsporty.price}</p>
            </div>
        ): <div>Loading</div>
    }
}

export default Sweatsporty