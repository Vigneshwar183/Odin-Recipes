import React , {Component} from "react";
import '../../styles/product';

class GalaxyFit extends Component{
    constructor(){
        super();
        this.state={
            galaxyFit:null
        }
    }

    async componentDidMount(){
        const response = await fetch('https://5d76bf96515d1a0014085cf9.mockapi.io/product',{mode:'cors'})
        const tempData = await response.json();
        const galaxyFit = tempData.filter((item)=>{
            return item.name==="galaxyFit";
        })
        this.setState({
            galaxyFit:galaxyFit,
        })
    }

    render(){
        return this.state.galaxyFit!==null?(
            <div className="Product">
                <img src={this.state.galaxyFit.preview} alt=""></img>
                <p>Name:{this.state.galaxyFit.name}</p>
                <p>Brand:{this.state.galaxyFit.brand}</p>
                <p>Size:{this.state.galaxyFit.size}</p>
                <p>Description:{this.state.galaxyFit.description}</p>
                <p>Price:{this.state.galaxyFit.price}</p>
            </div>
        ): <div>Loading</div>
    }
}

export default GalaxyFit