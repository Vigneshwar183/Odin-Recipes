import React,{useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import IndividualComment from './individualComment';
import './styles/comment.css';

function Comment({postId}){
    const {id} = useParams()
    const [comment, setComment] = useState('')
    const [allComments, setAllComments] = useState([])
    const [viewComment, setViewComment] = useState(false)
    const [reRenderCommentComponent, setRerenderCommentComponent] = useState(false)

    const commentHandler = async(event) =>{
        setComment(event.target.value)
    }

    const commentPostHandler = async(event)=>{
        var commentData = {
            userId: id,
            postId: postId,
            comment: comment 
        }
        const response = await fetch('http://localhost:3000/createComment',{method:'POST', headers: {'Content-Type':'application/json'}, body:JSON.stringify(commentData)})
        const tempData = await response.json()
        setViewComment(true)
        viewComments()
    }

    const viewComments = async(event)=>{
        const response = await fetch('http://localhost:3000/viewComment',{method:'POST', headers: {'Content-Type':'application/json'}, body:JSON.stringify({postId: postId})})
        const tempData = await response.json()
        setAllComments(tempData.comments)
    }

    const handleCommentRerender = ()=>{
        setRerenderCommentComponent(!reRenderCommentComponent)
    }


    useEffect(()=>{
        viewComments()
    },[viewComment, reRenderCommentComponent])

    return(
        <div className='commentBody'>
            <div className='createComment'>
                <img src='' alt='profile'></img>
                <input type='text' placeholder='write a comment' onChange={commentHandler}></input>
                <button type='button' onClick={commentPostHandler}>post comment</button>
            </div>                
            <p onClick={()=>setViewComment(true)}>View all Comments</p>
            { viewComment? 
                <div>
                    {allComments.map((comment)=>
                    (<IndividualComment comment={comment} key={comment._id} handleCommentRerender={handleCommentRerender}></IndividualComment>))}
                </div>:<></>
            }
        </div>
    )
}

export default Comment