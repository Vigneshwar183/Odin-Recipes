import React from 'react';

function SignUp(){
    const url = 'http:/localhost:3000/auth/sign_up'
    return(
        <div>
            <h1>Sign up Page</h1>
            <form method='post' action=''>
                <div className='form-group'>
                    <label for='firstName'>First Name:</label>
                    <input id='firstName' name='firstName' type='text'></input>
                </div>
                <div className='form-group'>
                    <label for='lastName'>Last Name:</label>
                    <input id='lastName' name='lastName' type='text'></input>
                </div>
                <div className='form-group'>
                    <label for='username'>Username:</label>
                    <input id='username' name='username' type='text'></input>
                </div>
                <div className='form-group'>
                    <label for='password'>Password:</label>
                    <input id='password' name='password' type='password'></input>
                </div>
                <button type='submit'> Submit</button>               
            </form>
        </div>
    )
}

export default SignUp