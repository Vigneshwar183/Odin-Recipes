import React from 'react';
import { useSelector } from 'react-redux';
import './styles/leftSidebar.css'
import PeopleIcon from '@mui/icons-material/People';
import Groups2Icon from '@mui/icons-material/Groups2';
import StorefrontIcon from '@mui/icons-material/Storefront';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import HistoryIcon from '@mui/icons-material/History';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

function LeftSidebar(){
    const user = useSelector((state)=>state.login)

    return (
        <div className='leftSidebar'>
            <div className='upperLeftBody'>
                <div className='iconsBody'>
                    <img src='' alt='profile'></img>
                    <p>{user.username}</p>
                </div>
                <div className='iconsBody'>
                    <PeopleIcon></PeopleIcon>
                    <p>Friends</p>
                </div>
                <div className='iconsBody'>
                    <Groups2Icon></Groups2Icon>
                    <p>Groups</p>
                </div>
                <div className='iconsBody'>
                    <StorefrontIcon></StorefrontIcon>
                    <p>MarketPlace</p>
                </div>
                <div className='iconsBody'>
                    <OndemandVideoIcon></OndemandVideoIcon>
                    <p>Watch</p>
                </div>
                <div className='iconsBody'>
                    <HistoryIcon></HistoryIcon>
                    <p>Memories</p>
                </div>
                <div className='iconsBody'>
                    <ArrowDropDownCircleIcon></ArrowDropDownCircleIcon>
                    <p>See More</p>
                </div>
            </div>
        </div>
    )
}

export default LeftSidebar