import React, { useState, useEffect } from 'react';
import { useParams , Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

function Post(){
    const {id}= useParams()
    const login = useSelector((state)=>state.login)
    const [postData, setPostData] = useState([])
    const [formData, setFormData] = useState({})
    const url= 'http://localhost:3000/post/'+id;

    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const attach = {
            ...formData,
            postId: id,
            userId: login.userId
        }
        const commentUrl = 'http://localhost:3000/users/post/'+id+'/createComment'
        const response = await fetch(commentUrl, {method:'POST', headers:{'Content-Type':'application/json','Authorization':'Bearer '+login.token},body:JSON.stringify(attach)})
        const tempData = await response.json()
        setPostData(tempData.posts[0])
    }

    const handleCommentDelete = async(event)=>{
        const commentId = event.target.parentNode.id
        const deleteUrl = 'http://localhost:3000/users/post/'+id+'/deleteComment'
        const response = await fetch(deleteUrl, {method:'POST', headers:{'Content-Type':'application/json','Authorization':'Bearer '+login.token},body:JSON.stringify({commentId:commentId})})
        const tempData = await response.json()
        const deleteComment = {...postData}
        deleteComment.comments.map((comment, index)=>{
            if (comment._id===tempData.comment._id){
                deleteComment.comments.splice(index,1)
                console.log(comment.comment)
            }
        })
        console.log(deleteComment)
        setPostData(deleteComment)
    }

    const handleDeletePost =async(event)=>{
        const postId = event.target.parentNode.id
        const deleteUrl= 'http://localhost:3000/users/deletePost' 
        const response = await fetch(deleteUrl,{method:'POST', headers:{'Content-Type':'application/json', 'Authorization': 'Bearer '+login.token},body:JSON.stringify({postId: postId})})
        const tempData = await response.json()
        setPostData([])
    }


    useEffect(()=>{
        async function getData(){
            const response = await fetch(url,{method:'POST',  headers:{'Content-Type':'application/json','Authorization':'Bearer '+login.token},body:JSON.stringify({postId:id})})
            const tempData = await response.json()
            setPostData(tempData.posts[0])
        }
        getData()
    },[])

    return(
        <>
        <div>
            <Link to='/'>
                <p>Home</p>
            </Link>
            <Link to={{pathname: `/${login.userId}/viewPosts/`}}>
                <p>
                    View Posts
                </p>
            </Link>
        </div>
        { (postData.author && postData.comments)?
            <div className='post' id={postData._id}>
                <h1>{postData.title}</h1>
                <h4>{postData.author.username}</h4>
                <p>{postData.createdAt}</p>
                <p>{postData.post}</p>
                {
                    postData.comments.map((comment)=>(
                        <div className='comment' key={comment._id} id={comment._id}>
                            <p>{comment.author.username}</p>
                            <p>{comment.comment}</p>
                            {
                                comment.author._id===login.userId?
                                    <button type='submit' onClick={handleCommentDelete}>Delete Comment</button>
                                :<></>
                            }
                            <hr></hr>
                        </div>
                    ))
                }
                {
                    login.userId===postData.author._id?
                    <button type='submit' onClick={handleDeletePost}> Delete Post</button>
                    :<></>
                }
                {
                    <div>
                        <form method='POST' action='' onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label htmlFor='comment'>Add Comment</label>
                                <textarea id='comment' name='comment' onChange={handleChange}></textarea>
                            </div>
                            <button type='submit'>Create Comment</button>
                        </form>
                    </div>
                }
            </div>:
            <div>No Posts</div>
        }
        </>
    )
}

export default Post