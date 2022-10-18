import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {useSelector} from 'react-redux';

function Post(){
    const {id}= useParams()
    const login = useSelector((state)=>state.login)
    const [postData, setPostData] = useState([])
    const url= 'http://localhost:3000/post/'+id;

    useEffect(()=>{
        async function getData(){
            const response = await fetch(url,{method:'POST',  headers:{'Content-Type':'application/json','Authorization':'Bearer '+login.token},body:JSON.stringify({postId:id})})
            const tempData = await response.json()
            console.log(tempData.posts[0])
            setPostData(tempData.posts[0])
        }
        getData()
    },[])


    return(
        <>{ (postData.author && postData.comments)?
            <div className='post'>
                <h1>{postData.title}</h1>
                <h4>{postData.author.username}</h4>
                <p>{postData.createdAt}</p>
                <p>{postData.post}</p>
                {
                    postData.comments.map((comment)=>(
                        <div className='comment' key={comment._id}>
                            <p>{comment.author.username}</p>
                            <p>{comment.comment}</p>
                            <hr></hr>
                        </div>
                    ))
                }
            </div>:
            <div>Loading</div>
        }</>
    )
}

export default Post