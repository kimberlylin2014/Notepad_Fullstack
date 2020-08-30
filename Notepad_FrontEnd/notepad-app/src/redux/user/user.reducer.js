import userActionTypes from './user.types';

const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    errorMessage: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case userActionTypes.REGISTER_USER_START:
        case userActionTypes.SIGNIN_USER_START:
            return {
                ...state,
                isLoading: true
            }
        case userActionTypes.REGISTER_USER_SUCCESS:
        case userActionTypes.SIGNIN_USER_SUCCESS:
        case userActionTypes.UPDATE_CURRENTUSER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentUser: action.payload,
            }
        case userActionTypes.REGISTER_USER_FAILURE:
        case userActionTypes.SIGNIN_USER_FAILURE:
        case userActionTypes.UPDATE_CURRENTUSER_FAILURE:
            return {
                ...state,
                isLoading: false,
                currentUser: null,
                errorMessage: action.payload
            }
        case userActionTypes.LOGOUT_USER:
        case userActionTypes.CLEAR_USERFORM_ERROR:
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