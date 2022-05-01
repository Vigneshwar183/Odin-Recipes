import React , {Component} from "react";
import '../styles/homepage.css';

class Homepage extends Component{
    constructor(){
        super();
        this.state={
            clothes: null,
            accessories: null,
        }
    }

    async componentDidMount(){
        console.log('hi')
        const response = await fetch('https://5d76bf96515d1a0014085cf9.mockapi.io/product',{mode:'cors'})
        const tempData= await response.json()
        const clothes=tempData.filter((item)=> {
            return !item.isAccessory
        })
        const accessories=tempData.filter((item)=>{
            return item.isAccessory
        })
        this.setState({
            clothes:clothes,
            accessories:accessories,
        })
    }

    render(){
        return this.state.clothes!==null ?(
            <div className="homepage">
                <h2>Clothing for Men and Women</h2>
                <div className="cards">
                    {this.state.clothes.map(item=>
                        <div className="card">
                            <img src={item.preview} alt=''></img>
                            <p>{item.name}</p>
                        </div>
                    )}
                </div>
                <h2>Accessories for Men and Women</h2>
                <div className="cards">
                    {this.state.accessories.map(item =>(
                        <div className="card">
                            <img src={item.preview} alt=''></img>
                            <p>{item.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        ):<div>Loading</div>
    }
}

export default Homepage