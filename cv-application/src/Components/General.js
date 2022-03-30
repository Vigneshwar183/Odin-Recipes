import React, {Component} from 'react';

class General extends Component{
   
    render(){
        const info= this.props.generalInfo;
        return(
            <div>
                <form>
                    <div>
                        <label htmlFor='userName'> Enter Name</label>
                        <input type='text' id='userName' value={info.userName || ''} onChange={this.props.handleStateChange}></input>
                    </div>
                    <div>
                        <label htmlFor='userMail'> Enter E-mail</label>
                        <input type='email' id='userMail' value={info.userMail || ''} onChange={this.props.handleStateChange}></input>
                    </div>
                    <div>
                        <label htmlFor='userNumber'> Enter Phone Number</label>
                        <input type='text' id='userNumber' value={info.userNumber || ''} onChange={this.props.handleStateChange}></input>
                    </div>
                </form>
            </div>
        )
    }
}

export default General;