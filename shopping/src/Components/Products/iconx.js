import React , {Component} from "react";
import '../../styles/product';

class Iconx extends Component{
    constructor(){
        super();
        this.state={
            iconx:null
        }
    }

    async componentDidMount(){
        const response = await fetch('https://5d76bf96515d1a0014085cf9.mockapi.io/product',{mode:'cors'})
        const tempData = await response.json();
        const iconx = tempData.filter((item)=>{
            return item.name==="iconx";
        })
        this.setState({
            iconx:iconx,
        })
    }

    render(){
        return this.state.iconx!==null?(
            <div className="Product">
                <img src={this.state.iconx.preview} alt=""></img>
                <p>Name:{this.state.iconx.name}</p>
                <p>Brand:{this.state.iconx.brand}</p>
                <p>Size:{this.state.iconx.size}</p>
                <p>Description:{this.state.iconx.description}</p>
                <p>Price:{this.state.iconx.price}</p>
            </div>
        ): <div>Loading</div>
    }
}

export default Iconx