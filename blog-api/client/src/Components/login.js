import React , {useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Navigate } from 'react-router-dom';

function Login(){
    const url = 'http://localhost:3000/auth/login';
    const [formData, setFormData]= useState({})
    const dispatch = useDispatch()
    const temp= useSelector((state)=>state.login)

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const response = await fetch(url, { method: 'POST', headers:{'Content-Type':'application/json'},body:JSON.stringify(formData)})
        const tempData = await response.json()
        dispatch({type:'Login', payload:tempData})
    }

    useEffect(()=>{
        console.log(temp)
    },[temp])

    return(
        <>
            {!temp.loggedIn?<>
                <div>
                    <h1>Login Page</h1>
                    <form method='POST' action='' onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label htmlFor='username'>Username:</label>
                            <input id='username' type='text' name='username' onChange={handleChange}></input>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password'>Password:</label>
                            <input id='password' type='password' name='password' onChange={handleChange}></input>
                        </div>
                        <button type='submit'>Login</button>
                    </form>
                </div>
            </>:<>
                <Navigate to='/'></Navigate>
            </>
            }
        </>
    )
}

export default Login