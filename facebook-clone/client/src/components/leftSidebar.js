import React from 'react';
import { useSelector } from 'react-redux';
import './styles/leftSidebar.css';
import friendsImage from './images/friends.png';
import groupImage from './images/groups.png';
import marketImage from './images/marketplace.png';
import watchImage from './images/watch.png';
import MemoryImage from './images/memories.png';
import CovidImage from './images/covid.png';
import adsImage from './images/ads-manager.png';
import savedImage from './images/saved.png';

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
                    <img src={friendsImage} alt=''></img>
                    <p>Friends</p>
                </div>
                <div className='iconsBody'>
                    <img src={groupImage} alt=''></img>
                    <p>Groups</p>
                </div>
                <div className='iconsBody'>
                    <img src={marketImage} alt=''></img>
                    <p>MarketPlace</p>
                </div>
                <div className='iconsBody'>
                    <img src={watchImage} alt=''></img>
                    <p>Watch</p>
                </div>
                <div className='iconsBody'>
                    <img src={MemoryImage} alt=''></img>
                    <p>Memories</p>
                </div>
                <div className='iconsBody'>
                    <img src={CovidImage} alt=''></img>
                    <p>Covid</p>
                </div>
                <div className='iconsBody'>
                    <img src={adsImage} alt=''></img>
                    <p>See More</p>
                </div>
                <div className='iconsBody'>
                    <img src={savedImage} alt=''></img>
                    <p>See More</p>
                </div>
            </div>
        </div>
    )
}

export default LeftSidebar