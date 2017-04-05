// import axios from 'axios'

//actions
const ADMIN_LOGGED_IN = 'ADMIN_LOGGED_IN'

//action creators
// const login = credentials => ({ type: LOGIN, credentials })
const adminLogged = bool => ({type: ADMIN_LOGGED_IN, bool})

//reducer
export default function reducer (adminStatus = false, action) {
    switch (action.type) {
        case ADMIN_LOGGED_IN:
            return action.bool
        
        default: return adminStatus
    }
}

//dispatchers
export const adminLogin = (isAdmin) => dispatch => {
    dispatch(adminLogged(isAdmin))
}