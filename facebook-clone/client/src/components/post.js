import React, { useEffect, useState} from "react";
import { useSelector } from "react-redux";
import Comment from "./comment";
import DeleteIcon from '@mui/icons-material/Delete';

function Post({post, pageRerenderUponDeletion, setPageRerenderUponDeletion}){
    const user = useSelector((state)=>state.login)
    const [currentPost, setCurrentPost] = useState(post)
    const [like, setLike] = useState(currentPost.likedBy && currentPost.likedBy.includes(user.userId))
    const [displayCommentComponent, setDisplayCommentComponent] = useState(false)

    const handleLikeChange = async() => {
        const formData = {
            userId: user.userId,
            postId: post._id,
            like: !like
        }
        const response = await fetch('http://localhost:3000/likeDislikePost',{method:'POST', headers: {'Content-Type':'application/json'}, body:JSON.stringify(formData)})
        const tempData = await response.json()        

        const handlePostUpdate = async (tempData)=>{
            const temporary = {...tempData.post}
            setCurrentPost(temporary)
        }
        const handleSetLike = ()=>{
            const temporary = currentPost.likedBy && currentPost.likedBy.includes(user.userId)
            setLike(temporary)
        }
        
        handlePostUpdate(tempData)
        handleSetLike()

    }

    const deletePost = async() =>{
        const response = await fetch('http://localhost:3000/deletePost',{method:'POST', headers: {'Content-Type':'application/json'}, body:JSON.stringify({postId:post._id})})
        const tempData = await response.json()
        RerenderBodyContent()
    }

    const RerenderBodyContent = () =>{
        setPageRerenderUponDeletion(!pageRerenderUponDeletion)
    }

    useEffect(()=>{
        console.log(currentPost, like)
    },[like])

    return(
        <div>
        { currentPost.author?
            <div className='post'>
                <div className='postHeader'>
                    <div className='postHeaderLeft'>
                        <img scr='' alt='profile'></img>
                        <div className='postUserData'>
                            <h4>{currentPost.author.username}</h4>
                            <p>{currentPost.createdAt}</p>
                        </div>
                    </div>
                    { user.userId === currentPost.author._id?<DeleteIcon onClick={deletePost}></DeleteIcon>:<></> }
                </div>
                <div className='postContent'>
                    <p>{currentPost.post}</p>
                </div>
                <hr></hr>
                <div className='postData'>
                    <p>{currentPost.likedBy.length} Likes</p>
                    <p>{currentPost.comments.length} Comments</p>
                </div>
                <hr></hr>
                <div className='postButtons'>
                    <div onClick={handleLikeChange}>Like</div>
                    <div>Comment</div>
                </div>
                <Comment postId={currentPost._id}></Comment>
            </div>:<div>Loading</div>
        }
        </div>
    )
}

export default Post