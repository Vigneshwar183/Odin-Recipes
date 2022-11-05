import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Post from './post';
import './styles/post.css'

function AllPosts({postCreatePageRefresh}){
    const user = useSelector((state)=>state.login)
    const [allPosts, setAllPosts] = useState([])
    const [pageRerenderUponDeletion, setPageRerenderUponDeletion] = useState(false)

    const getPosts = async()=>{
        const response = await fetch('http://localhost:3000/getPost',{method:'POST', headers: {'Content-Type':'application/json'}, body:JSON.stringify({userId:user.userId})})
        const tempData = await response.json()
        setAllPosts(tempData.posts)
    }

    useEffect(()=>{
        if(user) getPosts()
    },[user, pageRerenderUponDeletion, postCreatePageRefresh])

    return(
        <div className='posts'>
            { allPosts.map((post)=>(
                <Post post={post} key={post._id} pageRerenderUponDeletion={pageRerenderUponDeletion} setPageRerenderUponDeletion={setPageRerenderUponDeletion}></Post>
            ))
            }
        </div>
    )
}

export default AllPosts