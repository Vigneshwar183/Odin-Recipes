import { Avatar } from "@mui/material";
import React from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import '../styles/header.css'
import {useDataLayerValue} from "./DataLayer"

function Header(){
    const [{user},dispatch] = useDataLayerValue();
    return(
        <div className="header">
            <div className="headerLeft">
                <ArrowBackIosIcon/>
            </div>
            <div className="headerRight">
                 <Avatar src={user?.images[0]?.url} alt="user"/>
                <p>{user?.display_name}</p> 
            </div>
        </div>
    )
}

export default Header;