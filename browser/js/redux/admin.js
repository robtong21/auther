// import axios from 'axios'

//actions
const ADMIN_LOGGED_IN = 'ADMIN_LOGGED_IN'

//action creators
// const login = credentials => ({ type: LOGIN, credentials })
const adminLogged = bool => ({type: ADMIN_LOGGED_IN, bool})

//reducer
export default function reducer (isAdmin = false, action) {
    switch (action.type) {
        case ADMIN_LOGGED_IN:
        console.log('admin logged in is running')
            return action.bool
        
        default:
        console.log('but default is running')
        return isAdmin
    }
}

//dispatchers
export const adminLogin = (bool) => dispatch => {
    dispatch(adminLogged(bool))
}