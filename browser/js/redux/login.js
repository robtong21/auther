import axios from 'axios'
import { adminLogin } from './admin'

//actions
const SET_CURRENT_USER = 'SET_CURRENT_USER';

//action creators
// const login = credentials => ({ type: LOGIN, credentials })
const logged = userId => ({ type: SET_CURRENT_USER, userId })

//reducer
export default function reducer (currentUser = '', action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return action.userId

        default: return currentUser
    }
}

//dispatchers
export const getUser = (email, password) => dispatch => {
    axios.post('/api/login', {email, password})
        .then(res => {
            // console.log('res', res);
            dispatch(logged(res.data.id))
            dispatch(adminLogin(res.data.isAdmin))
        })
        .catch(err => console.error('oh noes,', err))
}

export const newUser = (email, password) => dispatch => {
    axios.post('/api/signup', {email, password})
        .then(res => {
            dispatch(getUser(email, password))
        })
        .catch(err => console.error('oh noes,', err))
}

export const logout = () => dispatch => {
    axios.post('/api/logout', {})
        .then(res => {
            dispatch(logged(''))
        })
        .catch(err => console.error('oh noes,', err))
}

export const fetchCurrentUser = () => dispatch => {
    axios.get('/api/auth/me')
        .then(res => {
            console.log('fetch res', res)
            if (res.data.passport) {
                dispatch(logged(res.data.passport.user[0]))
                dispatch(adminLogin(res.data.passport.user[1]))
            }
            else {
                if (res.data.userId) {
                    dispatch(logged(res.data.userId))
                }
                if (res.data.isAdmin) {
                    dispatch(adminLogin(res.data.isAdmin))
                }
            }
        })
        .catch(err => console.error('oh noes,', err))
}