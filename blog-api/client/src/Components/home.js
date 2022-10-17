import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';

function Home(){
    const [posts, setPost] = useState([])
    const isLoggedIn = useSelector((state)=>state.login.loggedIn)
    console.log(isLoggedIn)

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
            <>
            { !isLoggedIn? <>
                <div>
                    <Link to='/signup'>
                        <p>Sign Up</p>
                    </Link>
                </div>
                <div>
                    <Link to='login'>
                        <p>Login</p>
                    </Link>
                </div>
            </>
            :<>
                <div>
                    <Link to='/createPost'>
                        <p>Create Post</p>
                    </Link>
                </div>
                <div>
                    <Link to='users/posts'>
                        <p>View Posts</p>
                    </Link>
                </div>
            </>
            }</>
            {posts.map((post)=>(
                <Link>
                    <div className='home-post' key={post._id}>
                        <p>{post.author.username}</p>
                        <p>{post.publishedAt}</p>
                        <p>{post.post}</p>
                    </div>                    
                </Link>
            ))}
        </div>
    )
}

export default Home