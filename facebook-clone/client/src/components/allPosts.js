import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles/post.css'

function AllPosts(){
    const {id} = useParams()
    const [allPosts, setAllPosts] = useState([])

    const getPosts = async()=>{
        const response = await fetch('http://localhost:3000/getPost',{method:'POST', headers: {'Content-Type':'application/json'}, body:JSON.stringify({userId:id})})
        const tempData = await response.json()
        console.log(tempData)
        setAllPosts(tempData.posts)
    }

    useEffect(()=>{
        getPosts()
    },[])

    return(
        <div className='posts'>
            { allPosts.map((post)=>(
                <div className='post' key={post._id}>
                    <div className='postHeader'>
                        <img scr='' alt='profile'></img>
                        <div className='postUserData'>
                            <h4>{post.author.username}</h4>
                            <p>{post.createdAt}</p>
                        </div>
                    </div>
                    <div className='postContent'>
                        <p>{post.post}</p>
                    </div>
                    <div className='postData'>
                        <p>{post.likes} Likes</p>
                        <p>Comments</p>
                    </div>
                    <div className='postFooter'>
                        <div>Like</div>
                        <div>Comment</div>
                    </div>
                </div>
            ))
            }
        </div>
    )
}

export default AllPosts