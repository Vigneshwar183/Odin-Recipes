import React from "react";
import '../styles/sidebarOption.css'

function SidebarOption({title,Icon,handlePlaylistClick,id}){
    return(
        <div className="sidebarOption" onClick={() => handlePlaylistClick(id)}>
            {Icon && <Icon className="sidebarOption__icon"/> }
            {Icon ? <h4>{title}</h4>: <p>{title}</p>}
        </div>
    )
}

export default SidebarOption