import React from 'react';
import LeftSidebar from './leftSidebar';
import BodyContent from './bodyContent';
import './styles/body.css'

function Body(){

    return (
        <div className='Body'>
            <LeftSidebar></LeftSidebar>
            <BodyContent></BodyContent>
        </div>
    )
}

export default Body