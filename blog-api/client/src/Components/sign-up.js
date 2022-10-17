import React, {useState} from 'react';
import {Navigate} from 'react-router-dom';

function SignUp(){
    const url = 'http://localhost:3000/auth/sign_up';
    const [formData, updateFormData] = useState({})
    const [isSignedUp, setIsSignedUp] = useState(false)
    
    const handleChange = (e)=>{
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e){
        e.preventDefault()
        const response = await fetch(url,{method:'POST',headers:{'Content-Type': 'application/json'},body:JSON.stringify(formData)})
        const tempData = await response.json()
        if (tempData.signedUp){
            setIsSignedUp('true')
        }
    }
    return(
        <>
        {
            isSignedUp? <Navigate to={'/login'}/>:
        <div>
            <h1>Sign up Page</h1>
            <form method='POST' action='' onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='firstName'>First Name:</label>
                    <input id='firstName' name='firstName' type='text' onChange={handleChange}></input>
                </div>
                <div className='form-group'>
                    <label htmlFor='lastName'>Last Name:</label>
                    <input id='lastName' name='lastName' type='text' onChange={handleChange}></input>
                </div>
                <div className='form-group'>
                    <label htmlFor='username'>Username:</label>
                    <input id='username' name='username' type='text' onChange={handleChange}></input>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password:</label>
                    <input id='password' name='password' type='password' onChange={handleChange}></input>
                </div>
                <button type='submit' > Submit</button>               
            </form>
        </div>
        }
        </>
    )
}

export default SignUp