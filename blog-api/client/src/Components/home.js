import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import '../Components/styles/home.css';

function Home(){
    const [posts, setPost] = useState([])
    const isLoggedIn = useSelector((state)=>state.login.loggedIn)

    useEffect(()=>{
        async function getData(){
            const response = await fetch('http://localhost:3000/',{method:'GET'})
            const tempData=await response.json()
            setPost(tempData.posts)
        }
        getData()
    },[])
    return(
        <div>
            <h1>Home Page</h1>
            { !isLoggedIn? 
                <div className='header'>
                    <div className='header-content'>
                        <Link to='/signup'>
                            <p>Sign Up</p>
                        </Link>
                    </div>
                    <div className='header-content'>
                        <Link to='login'>
                            <p>Login</p>
                        </Link>
                    </div>
                </div>
            :<div className='header'>
                <div className='header-content'>
                    <Link to='/createPost'>
                        <p>Create Post</p>
                    </Link>
                </div>
                <div className='header-content'>
                    <Link to='/viewPosts'>
                        <p>View Posts</p>
                    </Link>
                </div>
            </div>
            }
            {posts.map((post)=>(
                <div key={post._id}>
                    <div className='home-post' >
                        {isLoggedIn?<Link to='/viewPosts'><p>{post.author.username}</p></Link>:<p>{post.author.username}</p>}
                        <p>{post.publishedAt}</p>
                        {isLoggedIn?<Link to='/post'><p>{post.post}</p></Link>:<p>{post.post}</p>}
                    </div>                    
                </div>
            ))}
        </div>
    )
}

export default Home