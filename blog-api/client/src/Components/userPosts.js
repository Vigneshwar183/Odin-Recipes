import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import '../Components/styles/userPosts.css';

function UserPosts(){
    const url = 'http://localhost:3000/users/posts'
    const login = useSelector((state)=>state.login)
    const [posts, setPosts] = useState([])

    const handleSubmit = async(event)=>{
        const postId =event.target.parentNode.id
        const publishUrl= 'http://localhost:3000/users/publishPost' 
        const response = await fetch(publishUrl,{method:'POST', headers:{'Content-Type':'application/json', 'Authorization': 'Bearer '+login.token},body:JSON.stringify({postId: postId})})
        const tempData = await response.json()
        console.log(tempData)
    }

    useEffect(()=>{
        async function getData(){
            const response = await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+login.token},body:JSON.stringify({userId:login.userId})})
            const tempData = await response.json()
            setPosts(tempData.posts)
        }
        getData()
    },[])

    return(
        <div>
            <Link to='/'>
                <p>Home</p>
            </Link>
            <h1>All posts</h1>
            {
                posts.map((post)=>(
                    <div className='userpost-post' key={post._id} >
                        <div className='posts' >
                            <Link to='/viewPosts'><p>{post.author.username}</p></Link>
                            <p>{post.publishedAt}</p>
                            <Link to={{pathname: `/post/${post._id}`}} ><p>{post.post}</p></Link>
                            {
                                post.comments.map((comment)=>(
                                    <div className='comment' key={comment._id}>
                                        {/* <p>{comment.author.username}</p> */}
                                        <p>{comment.comment}</p>
                                        <hr></hr>
                                    </div>
                                ))
                            }
                        </div>
                        <>
                        {
                            !post.published?
                                <button type='submit' onClick={(key)=>handleSubmit(key)}> Publish</button>
                            :<p>published</p>
                        }
                        </>
                    </div>
                ))
            }
        </div>
    )
}

export default UserPosts