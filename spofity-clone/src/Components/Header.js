import { Avatar } from "@mui/material";
import React from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function Header(){
    return(
        <div className="header">
            <div className="headerLeft">
                <ArrowBackIosIcon/>
            </div>
            <div className="headerRight">
                <Avatar src="" alt="user"/>
                <p>userName</p>
            </div>
        </div>
    )
}

export default Header;