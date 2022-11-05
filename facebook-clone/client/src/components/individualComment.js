import React from 'react';
import { useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';

function IndividualComment({comment, handleCommentRerender}){
    const user = useSelector((state)=>state.login)

    const deleteComment = async() =>{
        const response = await fetch('http://localhost:3000/deleteComment',{method:'POST', headers: {'Content-Type':'application/json'}, body:JSON.stringify({commentId:comment._id})})
        const tempData = await response.json()
        handleCommentRerender()
    }

    
    return(
        <div className='individualCommentBody'>
            <div className='individualCommentBodyLeft'>
                <img src='' alt='profile'></img>
                <div className='comment'>
                    <p>{comment.author.username}</p>
                    <p>{comment.comment}</p>
                </div>
            </div>
            { user.userId === comment.author._id?<DeleteIcon onClick={deleteComment}></DeleteIcon>:<></> }
        </div>
        
    )
}

export default IndividualComment