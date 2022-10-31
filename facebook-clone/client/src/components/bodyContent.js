import React from 'react';
import {useSelector} from 'react-redux';
import './styles/bodyContent.css'

function BodyContent(){
    const user = useSelector((state)=>state.login)

    return (
        <div className='BodyContent'>
            <div className='createPost'>
                <img src='' alt='profile'></img>
                <button type='button'>Create Post</button>
            </div>
        </div>
    )
}

export default BodyContent