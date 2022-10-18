import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import '../Components/styles/userPosts.css';

function UserPosts(){
    const {id} = useParams()
    const url = 'http://localhost:3000/users/posts'
    const login = useSelector((state)=>state.login)
    const [posts, setPosts] = useState([])

    const handleSubmit = async(event)=>{
        const postId =event.target.parentNode.id
        const publishUrl= 'http://localhost:3000/users/publishPost' 
        const response = await fetch(publishUrl,{method:'POST', headers:{'Content-Type':'application/json', 'Authorization': 'Bearer '+login.token},body:JSON.stringify({postId: postId})})
        const tempData = await response.json()
        const modifiedPost = [
            ...posts,
        ]
        modifiedPost.map((post, index)=>{
            if (tempData.post._id===post._id){
                modifiedPost.splice(index,1, tempData.post)
            }
        })
        setPosts(modifiedPost)
    }

    const handleDelete = async(event)=>{
        const postId = event.target.parentNode.id
        const deleteUrl= 'http://localhost:3000/users/deletePost' 
        const response = await fetch(deleteUrl,{method:'POST', headers:{'Content-Type':'application/json', 'Authorization': 'Bearer '+login.token},body:JSON.stringify({postId: postId})})
        const tempData = await response.json()
        const afterDeletion = [
            ...posts
        ]
        afterDeletion.map((post,index)=>{
            if (tempData.post._id===post._id)
                afterDeletion.splice(index,1)
        })
        setPosts(afterDeletion)
    }

    useEffect(()=>{
        async function getData(){
            const response = await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+login.token},body:JSON.stringify({userId:id})})
            const tempData = await response.json()
            setPosts(tempData.posts)
        }
        async function getDataArbitary(){
            const arbitaryUrl = 'http://localhost:3000/users/arbitaryUser/posts'
            const response = await fetch(arbitaryUrl,{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+login.token},body:JSON.stringify({userId:id})})
            const tempData = await response.json()
            setPosts(tempData.posts)
        }
        if (login.userId===id){
            getData()
        } else{
            getDataArbitary()
        }
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
                            <Link to={{pathname: `${post.author._id}/viewPosts/`}}><p>{post.author.username}</p></Link>
                            <p>{post.publishedAt}</p>
                            <Link to={{pathname: `/post/${post._id}`}} ><p>{post.post}</p></Link>
                        </div>
                        <>
                        {
                            login.userId===post.author._id?
                            <div>
                            {   
                                <div className='button' id={post._id} >
                                    <button type='button' onClick={(key)=>handleDelete(key)}> Delete</button>
                                    {!post.published?
                                    <button type='submit' onClick={(key)=>handleSubmit(key)}> Publish</button>
                                    :<p>published:{(post.published).toString()}</p>}
                                </div>
                            }
                            </div>:
                            <div>
                                <p>Published:{post.published.toString()}</p>
                            </div>
                        }
                        </>
                    </div>
                ))
            }
        </div>
    )
}

export default UserPosts