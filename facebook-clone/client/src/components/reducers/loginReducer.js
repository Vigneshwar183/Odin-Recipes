const loginReducer = (state={}, action) =>{
    switch(action.type){
        case 'Login':
            const clonedStore = {
                ...state,
                accessToken: action.payload.data.accessToken,
                username: action.payload.data.user.username,
                userId: action.payload.data.user._id,
                loggedIn: action.payload.data.loggedIn,
                refreshToken: action.payload.data.refreshToken
            }
            return clonedStore
        default:
            return state
    }
}

export default loginReducer