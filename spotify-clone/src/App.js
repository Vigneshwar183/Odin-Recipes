import React , { useEffect} from "react";
import Login from "./Components/Login";
import {getTokenFromUrl} from './Components/spotify';
import SpotifyWebApi from "spotify-web-api-js";
import Player from './Components/Player'
import { useDataLayerValue } from "./Components/DataLayer";

const spotify= new SpotifyWebApi();

function App() {
  const [{user, token, currentPlaylist}, dispatch] = useDataLayerValue();
  console.log(currentPlaylist);
  useEffect(()=>{
    const hash= getTokenFromUrl();
    window.location.hash="";

    const _token = hash.access_token;

    if (_token){
      dispatch({
        type: "SET_TOKEN",
        token:_token,
      });

      spotify.setAccessToken(_token)

      spotify.getMe().then((user)=>{
        console.log(user);
      
        dispatch({
          type: 'SET_USER',
          user: user,
        });
      });
      spotify.getUserPlaylists()
        .then((playlists)=>{
          dispatch({
            type: "SET_PLAYLISTS",
            playlists:playlists,
          })
          dispatch({
            type:"SET_CURRENT_PLAYLIST",
            currentPlaylist:playlists.items.length>0 ? playlists.items[0].id : null,
          })
        })
    }

  },[])

  useEffect(()=>{
    if (currentPlaylist)
    {
      spotify.getPlaylist(currentPlaylist).then((response) => 
        dispatch({
          type:"SET_CURRENT_PLAYLIST_DATA",
          currentPlaylistData:response,
        })
      )
    }
  },[currentPlaylist])

  return (
    <div className="App">
      {
        token ? (
          <Player spotify={spotify}/>
        ):(
          <Login/>
        )
      }
    </div>
  );
}

export default App;
