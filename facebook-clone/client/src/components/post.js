import React, { useState } from "react";
import Comment from "./comment";

function Post({post}){
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

    return(
        <div className='post'>
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