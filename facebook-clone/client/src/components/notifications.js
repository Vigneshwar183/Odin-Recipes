import React from "react";
import { useSelector } from "react-redux";

function Notifications({friend, viewNotifications, setViewNotifications}){
    const user = useSelector((state)=>state.login)

    const handleFriendRequest = async(event, req, res, next)=>{
        const formData = {
            userId: user.userId,
            friendId:friend._id,
            decision: event.target.value
        }
        const response = await fetch('http://localhost:3000/friendRequest',{method:'POST', headers: {'Content-Type':'application/json'}, body:JSON.stringify(formData)})
        const tempData = await response.json()
        setViewNotifications(!viewNotifications)
    }

    return(
        <div className='notifications'>
            <div className="notificationTop">
                <img src='' alt='profile'></img>
                <p>{friend.username}</p>
            </div>
            <div className='notificationBottom'>
                <button type='button' value='accept' onClick={(event)=>handleFriendRequest(event)}>Accept</button>
                <button type='button' value='reject' onClick={(event)=>handleFriendRequest(event)}>Reject</button>
            </div>
        </div>
    )
}

export default Notifications