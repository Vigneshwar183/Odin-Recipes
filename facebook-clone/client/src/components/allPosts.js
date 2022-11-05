import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Post from './post';
import './styles/post.css'

function AllPosts({postCreatePageRefresh}){
    const {id} = useParams()
    const [allPosts, setAllPosts] = useState([])
    const [pageRerenderUponDeletion, setPageRerenderUponDeletion] = useState(false)

    const getPosts = async()=>{
        const response = await fetch('http://localhost:3000/getPost',{method:'POST', headers: {'Content-Type':'application/json'}, body:JSON.stringify({userId:id})})
        const tempData = await response.json()
        setAllPosts(tempData.posts)
    }

    useEffect(()=>{
        getPosts()
    },[pageRerenderUponDeletion, postCreatePageRefresh])

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