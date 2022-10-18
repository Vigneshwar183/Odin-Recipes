import React, { useState, useEffect } from 'react';

function Post(postId){
    console.log(postId)
    const [postData, setPostData] = useState({})
    const url= 'http://localhost:3000/post/'+postId;

    useEffect(()=>{
        async function getData(){
            const response = await fetch(url,{method:'POST',  headers:{'Content-Type':'application/json'},body:JSON.stringify(postId)})
            const tempData = await response.json()
            console.log(tempData)
            setPostData(tempData)
        }
        getData()
    },[])


    return(
        <div className='post'>
            <h1>{postData.title}</h1>
            <h4>{postData.author}</h4>
            <p>{postData.createdAt}</p>
            <p>{postData.post}</p>
        </div>
    )
}

export default Post