import postActionTypes from './post.types';

const INITIAL_STATE = {
    userPosts: [],
    errorMessage: null,
    isLoading: false
}

const postReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case postActionTypes.CREATE_POST_START:
            return {
                ...state,
                isLoading: true
            }
        case postActionTypes.CREATE_POST_SUCCESS:
            return {
                ...state,
                userPosts: [...state.userPosts, action.payload],
                isLoading: false,
                errorMessage: null
            }
        case postActionTypes.CREATE_POST_FAILURE:
            return {
                ...state,
                errorMessage: action.payload,
                isLoading: false
            }
        default:
            return state
    }
}

export default postReducer;