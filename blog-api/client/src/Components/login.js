import React from 'react';

function Login(){
    return(
        <div>
            <h1>Login Page</h1>
            <form method='post' action=''>
                <div className='form-group'>
                    <label for='username'>Username:</label>
                    <input id='username' type='text' name='username'></input>
                </div>
                <div className='form-group'>
                    <label for='password'>Password:</label>
                    <input id='password' type='password' name='password'></input>
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login