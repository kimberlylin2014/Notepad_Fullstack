import postActionTypes from './post.types';
import userActionTypes from '../user/user.types';

const INITIAL_STATE = {
    userPosts: [],
    errorMessage: null,
    isLoading: false,
    displayModal: false
}

const postReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case postActionTypes.CREATE_POST_START:
        case postActionTypes.GET_USERPOSTS_START:
        case postActionTypes.UPDATE_POST_START:
        case postActionTypes.DELETE_POST_START:
            return {
                ...state,
                isLoading: true
            }
        case postActionTypes.CREATE_POST_SUCCESS:
            return {
                ...state,
                userPosts: [...action.payload.postArray],
                isLoading: false,
                errorMessage: null
            }
        case postActionTypes.GET_USERPOSTS_SUCCESS:
        case postActionTypes.UPDATE_POST_SUCCESS:
   
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                userPosts: [...action.payload]
            }
        case postActionTypes.DELETE_POST_SUCCESS:
                return {
                    ...state,
                    isLoading: false,
                    errorMessage: null,
                    userPosts: [...action.payload.comments]
                }
        case postActionTypes.CREATE_POST_FAILURE:
        case postActionTypes.GET_USERPOSTS_FAILURE:
        case postActionTypes.UPDATE_POST_FAILURE:
        case postActionTypes.DELETE_POST_FAILURE:
            return {
                ...state,
                errorMessage: action.payload,
                isLoading: false
            }
        case userActionTypes.LOGOUT_USER:
            return {
                userPosts: [],
                errorMessage: null,
                isLoading: false
            }
        default:
            return state
    }
}

export default postReducer;