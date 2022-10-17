import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom'

function UserPosts(){
    const url = 'http://localhost:3000/users/posts'
    const login = useSelector((state)=>state.login)
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        const response = fetch(url,{method:'GET',headers:{'Content-Type':'application/json','Authorization':'Bearer '+login.token},body:JSON.stringify({userId:login.userId})})
        const tempData = response.json()
        setPosts(tempData.posts)
    },[])

    return(
        <div>
            <Link to='/'>
                <p>Home</p>
            </Link>
            <h1>All posts</h1>
            {
                posts.map((post)=>{
                    <Link>
                        <div className='posts'>
                            <p>{post.author.username}</p>
                            <p>{post.publishedAt}</p>
                            <p>{post.post}</p>
                            <hr></hr>
                            {
                                post.map((comment)=>{
                                    <div className='comment'>
                                        <p>{comment.author}</p>
                                        <p>{comment.comment}</p>
                                        <hr></hr>
                                    </div>
                                })
                            }
                        </div>
                    </Link>
                })
            }
        </div>
    )
}

export default UserPosts