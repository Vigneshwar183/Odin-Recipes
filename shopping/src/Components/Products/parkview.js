import React , {Component} from "react";
import '../../styles/product';

class Parkview extends Component{
    constructor(){
        super();
        this.state={
            parkview:null
        }
    }

    async componentDidMount(){
        const response = await fetch('https://5d76bf96515d1a0014085cf9.mockapi.io/product',{mode:'cors'})
        const tempData = await response.json();
        const parkview = tempData.filter((item)=>{
            return item.name==="parkview";
        })
        this.setState({
            parkview:parkview,
        })
    }

    render(){
        return this.state.parkview!==null?(
            <div className="Product">
                <img src={this.state.parkview.preview} alt=""></img>
                <p>Name:{this.state.parkview.name}</p>
                <p>Brand:{this.state.parkview.brand}</p>
                <p>Size:{this.state.parkview.size}</p>
                <p>Description:{this.state.parkview.description}</p>
                <p>Price:{this.state.parkview.price}</p>
            </div>
        ): <div>Loading</div>
    }
}

export default Parkview