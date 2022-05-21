const initialState ={
    user : null,
    playlists: [],
    playing : false,
    item: null,
    token: null,
    currentPlaylist: "",
    currentPlaylistData:null,
};

const reducer = (state,action)=> {
    console.log(action);

    switch(action.type){
        case "SET_USER":
            return{
                ...state,
                user:action.user,
            };
        case "SET_TOKEN":
            return{
                ...state,
                token:action.token
            }
        case "SET_PLAYLISTS":
            return{
                ...state,
                playlists:action.playlists,
            }
        case "SET_CURRENT_PLAYLIST":
            return{
                ...state,
                currentPlaylist: action.currentPlaylist,
            }
        case "SET_CURRENT_PLAYLIST_DATA":
            return{
                ...state,
                currentPlaylistData:action.currentPlaylistData,
            }
        default:
            return state
    }
}

export {initialState, reducer}