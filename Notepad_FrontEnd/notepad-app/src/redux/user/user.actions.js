import userActionTypes from './user.types';

export const registerUserStart = (credentials) => {
    return {
        type: userActionTypes.REGISTER_USER_START,
        payload: credentials
    }
}

export const registerUserSuccess = (user) => {
    return {
        type: userActionTypes.REGISTER_USER_SUCCESS,
        payload: user
    }
}

export const registUserFailure = (error) => {
    return {
        type: userActionTypes.REGISTER_USER_FAILURE,
        payload: error
    }
}

export const logOutUser = () => {
    return {
        type: userActionTypes.LOGOUT_USER,
    }
}