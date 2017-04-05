import axios from 'axios'

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
export const newUser = (email, password) => dispatch => {
    axios.post('/api/login', {email, password})
        .then(res => res.send()) //dispatch(logged(res.data.id)))
        .catch(err => console.error('oh noes,', err))
}