import React , {Component} from "react";

class Homepage extends Component{
    constructor(){
        super();
        this.state={
            data: null,
        }
    }

    async componentDidMount(){
        console.log('hi')
        const response = await fetch('https://5d76bf96515d1a0014085cf9.mockapi.io/product')
        const tempData= await response.json()
        this.setState({
            data:tempData
        })
        console.log(this.state.data)
    }
    
    render(){
        return(
            <div className="homepage">
                <h2>Clothing for Men and Women</h2>
                <div className="cards">
                    <div className="card">
                        
                    </div>
                    <div className="card">
                        
                    </div>
                    <div className="card">
                        
                    </div>
                    <div className="card">
                        
                    </div>
                    <div className="card">
                        
                    </div>
                </div>
                <h2>Accessories for Men and Women</h2>
                <div className="cards">
                    <div className="card">
                        
                    </div>
                    <div className="card">
                        
                    </div>
                    <div className="card">
                        
                    </div>
                    <div className="card">
                        
                    </div>
                    <div className="card">
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default Homepage