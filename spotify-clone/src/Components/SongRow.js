import React from "react";
import '../styles/songrow.css';

function SongRow({track}){
    console.log(track)
    return(
        <div className="songs">
            <img src={track.album.images[0].url} alt="song"></img>
            <div>
                <h4>{track?.name}</h4>
                <p>{track?.album.name}</p>
            </div>
        </div>
    )
}

export default SongRow