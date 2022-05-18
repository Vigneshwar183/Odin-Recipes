import React from "react"
import '../styles/footer.css';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import RepeatIcon from '@mui/icons-material/Repeat';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import {Grid, Slider} from "@mui/material";
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';


function Footer(){
    return(
        <div className="footer">
            <div className="footerLeft">
                <img src="" alt="album"></img>
                <div>
                    <h4>Name</h4>
                    <p>Song</p>
                </div>
            </div>
            <div className="footerCenter">
                <ShuffleIcon className="footerGreen"/>
                <SkipPreviousIcon className="footerIcon"/>
                <PlayCircleOutlineIcon fontSize="large" className="footerIcon"/>
                <SkipNextIcon className="footerIcon"/>
                <RepeatIcon className="footerGreen"/>
            </div>
            <div className="footerRight">
                <Grid container spacing={2}>
                    <Grid item>
                        <PlaylistPlayIcon/>
                    </Grid>
                    <Grid item>
                        <VolumeDownIcon/>
                    </Grid>
                    <Grid item xs>
                        <Slider className="footerGreen"/>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Footer