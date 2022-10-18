const loginReducer = (state={}, action) =>{
    switch(action.type){
        case 'Login':
            const clonedStore = {
                ...state,
                token: action.payload.token,
                username: action.payload.user.username,
                userId: action.payload.user._id,
                loggedIn: action.payload.loggedIn
            }
            return clonedStore
        default:
            return state
    }
}

export default loginReducer