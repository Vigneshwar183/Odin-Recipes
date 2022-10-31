import React from 'react';
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

function Header(){
    const user = useSelector((state)=>state.login)

    return(
        <div className='Header'>
            <div className='leftContainer'>
                <img className='headerImage' src='' alt='facebookLogo'></img>
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
                    <NotificationsActiveIcon></NotificationsActiveIcon>
                </div>
                <div className='icons'>
                    <img className='headerImage' src='' alt='profile'></img>
                </div>
            </div>
        </div>
    )
}

export default Header