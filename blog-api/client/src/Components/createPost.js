import React,{useState} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

function CreatePost(){
    const url = 'http://localhost:3000/users/createPost';
    const login = useSelector((state)=>state.login)
    const [formData, setFormData] = useState({userId: login.userId})
    
    const handleChange= (e)=>{
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit= async(e)=>{
        e.preventDefault();
        const response = await fetch(url,{method:'POST', headers:{'Content-Type':'application/json', 'Authorization':'Bearer '+login.token}, body:JSON.stringify(formData)})
        const tempData = await response.json()
        console.log(tempData)
    }
    
    return(
        <div>
            <Link to='/'>
                <div>
                    Home
                </div>
            </Link>
            <Link to='/viewPosts'>
                <div>
                    View Posts
                </div>
            </Link>
            <h1>Create Post</h1>
            <form method='POST' action='' onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='title'>Title:</label>
                    <input id='title' name='title' type='text' onChange={handleChange}></input>
                </div>
                <div className='form-group'>
                    <label htmlFor='post'>Post:</label>
                    <textarea id='post' name='post' onChange={handleChange}></textarea>
                </div>
                <button type='submit'>Create</button>
            </form>
        </div>
    )
}

export default CreatePost