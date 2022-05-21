import React from "react"
import '../styles/body.css'
import { useDataLayerValue } from "./DataLayer";
import Header from "./Header";
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SongRow from '../Components/SongRow'

function Body({spotify}){
    const [{currentPlaylistData},dispatch]= useDataLayerValue();
    console.log(currentPlaylistData)
    return(
        <div className="body">
            <Header spotify={spotify}/>
            <div className="body_info">
                <img src={currentPlaylistData?.images[0].url} alt="playlist"></img>
                <div className="body_infoText">
                    <strong>PLAYLIST</strong>
                    <h2>{currentPlaylistData?.name}</h2>
                </div>
            </div>
            <div className="body_icons">
                <PlayCircleFilledIcon/>
                <MoreHorizIcon/>
            </div>
            <div className="body_songs">
                {currentPlaylistData?.tracks.items.map((item,index)=>(
                    <SongRow track={item.track}/>
                ))}
            </div>
        </div>
    )
}

export default Body