import React, {useState} from 'react';
import {useParams} from 'react-router-dom'
import './styles/createPostModal.css'

function CreatePostModal({closeModal, handlePageRefresh}){
    const {id} = useParams()
    const [post, setPost] = useState('')

    const handleTextarea = (event)=>{
        setPost(event.target.value)
    }
    
    const submitPost = async()=>{
        const formData = {
            userId: id,
            post: post
        }
        const response = await fetch('http://localhost:3000/createPost',{method:'POST', headers: {'Content-Type':'application/json'}, body:JSON.stringify(formData)})
        const tempData = await response.json()
        console.log(tempData)
        handlePageRefresh()
        CloseModalHandler()
    }


    function CloseModalHandler(){
        closeModal(false)
    }

    return(
        <div className='ModalBackground'>
            <div className='ModalContainer'>
                <div className='ModalHeader'>
                    <h1>Create Post</h1>
                    <button type='button' onClick={CloseModalHandler}> X </button>
                </div>
                <div className='ModalBody'>
                    <textarea onChange={handleTextarea} placeholder='What is on your mind?' cols='28' rows='5'></textarea>
                </div>
                <div className='ModalFooter'>
                    <button onClick={submitPost}>Post</button>
                </div>
            </div>
        </div>
    )
}

export default CreatePostModal