import React, { Component } from "react";

class Display extends Component{
    render(){
        return(
            <div>
                <h2>Personal Details</h2>
                <p>userName:{this.props.displayInfo.generalInfo.userName}</p>
                <p>userMail:{this.props.displayInfo.generalInfo.userMail}</p>
                <p>userNumber:{this.props.displayInfo.generalInfo.userNumber}</p>
                <h2>Education</h2>
                {this.props.displayInfo.educationInfo.map((education,index)=>{
                    return (
                        <div key={index}>
                            <p>Institution:{education.institution}</p>
                            <p>Title:{education.title}</p>
                            <p>From:{education.from}</p>
                            <p>To:{education.to}</p>
                        </div>
                    )
                })}
                <h2>Practical Experience</h2>
                {this.props.displayInfo.practicalInfo.map((practical,index)=>{
                    return(
                        <div key={index}>
                            <p>Institution:{practical.institution}</p>
                            <p>Title:{practical.title}</p>
                            <p>Description:{practical.description}</p>
                            <p>From:{practical.from}</p>
                            <p>To:{practical.to}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Display