import React , {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import './styles/home.css'

function Home() {
  const login = useSelector((state)=>state.login)
  const {id} = useParams()

  async function handleLogin(event){
    window.open('http://localhost:3000/auth/login/facebook', '_self')
    
  }

  useEffect(()=>{
  },[login])

  return (
    <>
      { !id?<>
        <div className="Home">
          <div className='leftContainer'>
            <h1>Welcome to Facebook clone</h1>
          </div>
          <div className='rightContainer'>
            <img src='' alt='facebook-logo'></img>
            <button type='submit' onClick={handleLogin}>Login with Facebook</button>
          </div>
        </div>
      </>:<>
        <h1>Logged In</h1>
        <p>{id}</p>
      </>
      }
    </>
  );
}

export default Home;