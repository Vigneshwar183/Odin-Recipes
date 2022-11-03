import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function RightSidebar(){
    const {id} = useParams()
    const [userFriends, setUserFriends] = useState([])

    const getFriends = async()=>{
        const response = await fetch('http://localhost:3000/',{method:'POST', headers: {'Content-Type':'application/json'}, body:JSON.stringify({id:id})})
        const tempData = await response.json()
        setUserFriends(tempData.friendList)
    }

    useEffect(()=>{
        getFriends()
    },[])

    return(
        <div>
            { userFriends?
                <div>
                    You got friends
                </div>: <div>
                    No friends
                </div>
            }
        </div>
    )
}

export default RightSidebar