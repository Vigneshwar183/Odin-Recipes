import React from 'react';
import LeftSidebar from './leftSidebar';
import BodyContent from './bodyContent';
import RightSidebar from './rightSidebar';
import './styles/body.css'

function Body(){

    return (
        <div className='Body'>
            <LeftSidebar></LeftSidebar>
            <BodyContent></BodyContent>
            <RightSidebar></RightSidebar>
        </div>
    )
}

export default Body