import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

function Home(){
    const [posts, setPost] = useState([])
    useEffect(()=>{
        async function getData(){
            const response = await fetch('http://localhost:3000/',{method:'GET'})
            const tempData=await response.json()
            console.log(tempData.posts)
            setPost(tempData.posts)
        }
        getData()
    },[])
    return(
        <div>
            <h1>Home Page</h1>
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
            {posts.map((post)=>(
                <Link>
                    <p>{post.author.username}</p>
                    <p>{post.publishedAt}</p>
                    <p>{post.post}</p>
                </Link>
            ))}
        </div>
    )
}

export default Home