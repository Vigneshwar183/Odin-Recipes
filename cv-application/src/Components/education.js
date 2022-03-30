import React, { Component } from "react";

class Education extends Component{
    constructor(){
        super();
        this.state={
            info:{
                institution:'',
                title: '',
                from: '',
                to: '',
            },
        };
        this.handleChange=this.handleChange.bind(this);
        this.buttonClick1=this.buttonClick1.bind(this);
    }

    handleChange=(e)=>{
        this.setState({
            info:{
                ...this.state.info,
                [e.target.id]:e.target.value,
            }
        })
    }

    buttonClick1=(e)=>{
        if (e.target.className==='add'){
            this.props.handleStateChange(this.state.info)
        }
        else{
            this.setState({
                info:{
                    institution:'',
                    title: '',
                    from: '',
                    to: '',
                },
            });
        }
    }

    render(){
        const {info} = this.state
        
        return (
            <div>
                <div>    
                    <label htmlFor='institution'> Institution</label>
                    <input type='text' id='institution' value={info.institution|| ''} onChange={this.handleChange}></input>
                </div>
                <div>
                    <label htmlFor='title'> Title</label>
                    <input type='text' id='title' value={info.title || ''} onChange={this.handleChange}></input>
                </div>
                <div>   
                    <label htmlFor='from'> From</label>
                    <input type='date' id='from' value={info.from || ''} onChange={this.handleChange}></input>
                </div>
                <div>    
                    <label htmlFor='to'> To</label>
                    <input type='date' id='to' value={info.to || ''} onChange={this.handleChange}></input>
                </div>
                <div>
                    <button className='add' onClick={((e)=>(
                        this.buttonClick1(e)
                        ))}> Add</button>
                    <button className='delete' onClick={((e)=>(
                        this.buttonClick1(e)
                        ))}> Delete</button>
                </div>
            </div>
        )
    }
}

export default Education;