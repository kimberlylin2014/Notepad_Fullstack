import userActionTypes from './user.types';

const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    errorMessage: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case userActionTypes.REGISTER_USER_START:
            return {
                ...state,
                isLoading: true
            }
        case userActionTypes.REGISTER_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentUser: action.payload,
            }
        case userActionTypes.REGISTER_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                currentUser: null,
                errorMessage: action.payload
            }
        case userActionTypes.LOGOUT_USER:
            return {
                currentUser: null,
                isLoading: false,
                errorMessage: null
            }
        default: 
            return state;
        
    }
}

export default userReducer;