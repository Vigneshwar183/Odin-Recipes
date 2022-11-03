import React from 'react';

function IndividualComment({comment}){
    return(
        <div className='individualCommentBody'>
            <img src='' alt='profile'></img>
            <div className='comment'>
                <p>{comment.author.username}</p>
                <p>{comment.comment}</p>
            </div>
        </div>
    )
}

export default IndividualComment