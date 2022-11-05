import React , {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import './styles/home.css'
import Header from './header';
import Body from './body'
import facebookLogo from './images/facebook-logo.png'

function Home() {
  const {id} = useParams()
  const dispatch = useDispatch()

  async function handleLogin(event){
    window.open('http://localhost:3000/auth/login/facebook', '_self')
  }

  async function getUserData(){
    const response = await fetch('http://localhost:3000/',{method:'POST', headers: {'Content-Type':'application/json'}, body:JSON.stringify({id:id})})
    const tempData = await response.json()
    dispatch({type:'Login', payload:tempData})
  }

  useEffect(()=>{
    if(id) {
      getUserData()
    }
  },[])

  return (
    <>
      { !id?
        <>
          <div className="Home">
            <div className='loginLeftContainer'>
              <h1>Welcome to Facebook clone</h1>
            </div>
            <div className='loginRightContainer'>
              <button onClick={handleLogin}><img className='homeImage' src={facebookLogo} alt='facebook-logo'></img>Login with Facebook</button>
            </div>
          </div>
        </>:
        <>
          <Header></Header>
          <Body></Body>
        </>
      }
    </>
  );
}

export default Home;