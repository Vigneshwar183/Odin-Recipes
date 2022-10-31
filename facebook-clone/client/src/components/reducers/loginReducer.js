const loginReducer = (state={}, action) =>{
    switch(action.type){
        case 'Login':
            const clonedStore = {
                ...state,
                username: action.payload.user.username,
                userId: action.payload.user._id,
            }
            return clonedStore
        default:
            return state
    }
}

export default loginReducer