import React,{useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import './styles/bodyContent.css'
import CreatePostModal from './createPostModal';
import AllPosts from './allPosts';

function BodyContent(){
    const user = useSelector((state)=>state.login)
    const [openModal, setOpenModal]= useState(false)
    const [pageRefresh, setPageRefresh] = useState(false)

    function createPostHandler(){
        setOpenModal(true)
    }

    const handlePageRefresh = ()=>{
        if (pageRefresh) setPageRefresh(false)
        else setPageRefresh(true)
    }

    useEffect(()=>{

    },[pageRefresh])

    return (
        <div className='BodyContent'>
            <div className='createPost'>
                <img src='' alt='profile'></img>
                <button type='button' onClick={createPostHandler}>Create Post</button>
            </div>
            {openModal && <CreatePostModal closeModal={setOpenModal} handlePageRefresh={handlePageRefresh}></CreatePostModal>}
            <AllPosts></AllPosts>
        </div>
    )
}

export default BodyContent