import React, {Component} from "react";
import General from './Components/General';
import Education from './Components/education';
import Practical from './Components/practical';
import Display from './Components/display';


class App extends Component{
  constructor(){
    super();
    this.state={
      generalInfo:{
        userName:'',
        userMail:'',
        userNumber: '',
      },
      educationInfo:[],
      practicalInfo:[],
      showResult: false,
    }
    this.handleGeneralStateChange=this.handleGeneralStateChange.bind(this);
    this.handleEducationStateChange=this.handleEducationStateChange.bind(this);
    this.handlePracticalStateChange=this.handlePracticalStateChange.bind(this);
    this.handleButtonClick=this.handleButtonClick.bind(this);
  }
  
  handleGeneralStateChange=(e)=>{
    const copyOf_generalInfo={
      ...this.state.generalInfo,
      [e.target.id]:e.target.value,
    }
    this.setState({
      generalInfo:copyOf_generalInfo,
    });
  }

  handleEducationStateChange=(info)=>{
    this.setState({
      educationInfo:this.state.educationInfo.concat(info)
    });
    
  }

  handlePracticalStateChange=(info)=>{
    this.setState({
      practicalInfo:this.state.practicalInfo.concat(info)
    });
  }

  handleButtonClick=()=>{
    this.setState({
      showResult:true,
    })
  }

  render(){
    return(
      <div>
        <General generalInfo={this.state.generalInfo} handleStateChange={this.handleGeneralStateChange} ></General>
        <Education educationInfo={this.state.educationInfo} handleStateChange={this.handleEducationStateChange}></Education>
        <Practical practicalInfo={this.state.practicalInfo} handleStateChange={this.handlePracticalStateChange}></Practical>
        <button onClick={this.handleButtonClick}> Submit </button>
        {this.state.showResult ? <Display displayInfo={this.state}></Display> : ''}
      </div>
    )
  }
}

export default App;
