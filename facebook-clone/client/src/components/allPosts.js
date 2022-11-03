import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Post from './post';
import './styles/post.css'

function AllPosts(){
    const {id} = useParams()
    const [allPosts, setAllPosts] = useState([])

    const getPosts = async()=>{
        const response = await fetch('http://localhost:3000/getPost',{method:'POST', headers: {'Content-Type':'application/json'}, body:JSON.stringify({userId:id})})
        const tempData = await response.json()
        setAllPosts(tempData.posts)
    }

    useEffect(()=>{
        getPosts()
    },[])

    return(
        <div className='posts'>
            { allPosts.map((post)=>(
                <Post post={post} key={post._id}></Post>
            ))
            }
        </div>
    )
}

export default AllPosts