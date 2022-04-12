import React , {Component} from "react";

class Homepage extends Component{
    render(){
        return(
            <div className="parent">
                <div className="dress">
                    <img alt="dress"></img>
                    <div>Dress</div>
                </div>
                <div className="shoes">
                    <img alt="shoes"></img>
                    <div>shoes</div>
                </div>
            </div>
        )
    }
}

export default Homepage