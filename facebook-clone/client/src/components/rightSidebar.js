import React, { useEffect, useState } from "react";
import {useSelector} from 'react-redux';
import './styles/rightSidebar.css';

function RightSidebar(){
    const user = useSelector((state)=>state.login)
    const [userFriends, setUserFriends] = useState([])
    const [userNotFriends, setUserNotFriends] = useState([])

    const getFriends = async()=>{
        const response = await fetch('http://localhost:3000/getFriends',{method:'POST', headers: {'Content-Type':'application/json'}, body:JSON.stringify({id:user.userId})})
        const tempData = await response.json()
        setUserFriends(tempData.friendList)
    }

    const peopleYouMayKnow = async()=>{
        const response = await fetch('http://localhost:3000/getNotFriends',{method:'POST', headers: {'Content-Type':'application/json'}, body:JSON.stringify({id:user.userId})})
        const tempData = await response.json()
        setUserFriends(tempData.noFriendList)
    }

    const handleFriendRequest = async(event, req, res, next)=>{
        const formData = {
            userId: user.userId,
            friendId:event.target.parentNode.id,
            decision: event.target.value
        }
        const response = await fetch('http://localhost:3000/friendRequest',{method:'POST', headers: {'Content-Type':'application/json'}, body:JSON.stringify(formData)})
        const tempData = await response.json()
    }

    useEffect(()=>{
        if(user) getFriends()
    },[user])

    return(
        <div className='rightSidebar'>
            <h2>Friend List</h2>
            { userFriends && userFriends.length>0?
                <div className='friendList'>
                    { userFriends.friendList.map((friends, index)=>{
                        <div className='friends'>
                            <img src="" alt='profile'></img>
                            <p>{friends.author.username}</p>
                        </div>
                    })}
                </div>: <p className="friendList">No friends</p>
            }
            <hr></hr>
            <h2>People you may know</h2>
            { userNotFriends && userNotFriends.length>0?
                <div className='People'>
                    {
                        userNotFriends.map((people, index)=>{
                            return(
                                <div className="peopleList">
                                    <div className="peopleListTop">
                                        <img src="" alt="profile"></img>
                                        <p>{people.username}</p>
                                    </div>
                                    <div className="peopleListBottom" id={people._id}>
                                        <button type='button' value='accept' onClick={(event)=>handleFriendRequest(event)}>Accept</button>
                                        <button type='button' value='reject' onClick={(event)=>handleFriendRequest(event)}>Reject</button>
                                    </div>
                                </div>
                            )
                            
                        })
                    }
                </div>:<p className="People">You've befriended everybody</p>
            }
        </div>
    )
}

export default RightSidebar