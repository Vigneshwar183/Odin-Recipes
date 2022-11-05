import React, { useState } from "react";
import { useSelector } from "react-redux";
import Comment from "./comment";
import DeleteIcon from '@mui/icons-material/Delete';

function Post({post, pageRerenderUponDeletion, setPageRerenderUponDeletion}){
    const user = useSelector((state)=>state.login)
    const [like, setLike] = useState(true)
    const [displayCommentComponent, setDisplayCommentComponent] = useState(false)

    const handleLikeChange = async() => {
        const formData = {
            postId: post._id,
            like: like
        }
        const response = await fetch('http://localhost:3000/likeDislikePost',{method:'POST', headers: {'Content-Type':'application/json'}, body:JSON.stringify(formData)})
        const tempData = await response.json()
    }

    const deletePost = async() =>{
        const response = await fetch('http://localhost:3000/deletePost',{method:'POST', headers: {'Content-Type':'application/json'}, body:JSON.stringify({postId:post._id})})
        const tempData = await response.json()
        RerenderBodyContent()
    }

    const RerenderBodyContent = () =>{
        setPageRerenderUponDeletion(!pageRerenderUponDeletion)
    }

    return(
        <div className='post'>
            <div className='postHeader'>
                <div className='postHeaderLeft'>
                    <img scr='' alt='profile'></img>
                    <div className='postUserData'>
                        <h4>{post.author.username}</h4>
                        <p>{post.createdAt}</p>
                    </div>
                </div>
                { user.userId === post.author._id?<DeleteIcon onClick={deletePost}></DeleteIcon>:<></> }
            </div>
            <div className='postContent'>
                <p>{post.post}</p>
            </div>
            <hr></hr>
            <div className='postData'>
                <p>{post.likes} Likes</p>
                <p>Comments</p>
            </div>
            <hr></hr>
            <div className='postButtons'>
                <div onClick={handleLikeChange}>Like</div>
                <div>Comment</div>
            </div>
            <Comment postId={post._id}></Comment>
        </div>
    )
}

export default Post