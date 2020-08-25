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

export const signInUserStart = (credentials) => {
    return {
        type: userActionTypes.SIGNIN_USER_START,
        payload: credentials
    }
}

export const signInUserSuccess = (user) => {
    return {
        type: userActionTypes.SIGNIN_USER_SUCCESS,
        payload: user
    }
}

export const signInUserFailure = (error) => {
    return {
        type: userActionTypes.SIGNIN_USER_FAILURE,
        payload: error
    }
}

export const updateCurrentUserSuccess = (user) => {
    return {
        type: userActionTypes.UPDATE_CURRENTUSER_SUCCESS,
        payload: user
    }
}

export const updateCurrentUserFailure = (error) => {
    return {
        type: userActionTypes.UPDATE_CURRENTUSER_FAILURE,
        payload: error
    }
}