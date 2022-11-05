import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import HomeIcon from '@mui/icons-material/Home';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import StorefrontIcon from '@mui/icons-material/Storefront';
import GroupsIcon from '@mui/icons-material/Groups';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import MenuIcon from '@mui/icons-material/Menu';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import './styles/header.css'
import Notifications from './notifications';
import facebookLogo from './images/facebook-logo.png';

function Header(){
    const user = useSelector((state)=>state.login)
    const [currentUser, setCurrentUser] = useState({})
    const [viewNotifications, setViewNotifications] = useState(false)

    const handleSetNotifications = () =>{
        setViewNotifications(!viewNotifications)
    }


    useEffect(()=>{
        async function getUserData(){
            const response = await fetch('http://localhost:3000/notifications',{method:'POST', headers: {'Content-Type':'application/json'}, body:JSON.stringify({id:user.userId})})
            const tempData = await response.json()
            setCurrentUser({...tempData.user})
        }
        if(user) getUserData()
    },[user])

    return(
        <div className='Header'>
            <div className='leftContainer'>
                <img className='headerImage' src={facebookLogo} alt='facebookLogo'></img>
                <div className='searchBar'>
                    <input type='text' placholder='search'></input>
                </div>
            </div>
            <div className='centerContainer'>
                <div className='icons'>
                    <HomeIcon></HomeIcon>
                </div>
                <div className='icons'>
                    <OndemandVideoIcon></OndemandVideoIcon>
                </div>
                <div className='icons'>
                    <StorefrontIcon></StorefrontIcon>
                </div>
                <div className='icons'>
                    <GroupsIcon></GroupsIcon>
                </div>
                <div className='icons'>
                    <SportsEsportsIcon></SportsEsportsIcon>
                </div>
            </div>
            <div className='rightContainer'>
                <div className='icons'>
                    <MenuIcon></MenuIcon>
                </div>
                <div className='icons'>
                    <MessageIcon></MessageIcon>
                </div>
                <div className='icons'>
                    <NotificationsActiveIcon onClick={handleSetNotifications}></NotificationsActiveIcon>
                    { viewNotifications?
                        <div className='list'>
                            {
                                currentUser.notifications && currentUser.notifications.length>0?currentUser.notifications.map((tempUser, index)=>{
                                    return (
                                        <Notifications friend={tempUser} viewNotifications={viewNotifications} setViewNotifications={setViewNotifications}></Notifications>
                                    )
                                }):<p>No new notifications</p>
                            }
                        </div>:<></>
                    }
                </div>
                <div className='icons'>
                    <img className='headerImage' src='' alt='profile'></img>
                </div>
            </div>
        </div>
    )
}

export default Header