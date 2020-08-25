import postActionTypes from './post.types';

export const createPostStart = (text) => {
    return {
        type: postActionTypes.CREATE_POST_START,
        payload: text
    }
}

export const createPostSuccess = (createdPost) => {
    return {
        type: postActionTypes.CREATE_POST_SUCCESS,
        payload: createdPost
    }
}

export const createPostFailure = (error) => {
    return {
        type: postActionTypes.CREATE_POST_FAILURE,
        payload: error
    }
}

export const getUserPostsStart = (user) => {
    return {
        type: postActionTypes.GET_USERPOSTS_START,
        payload: user
    }
}

export const getUserPostsSuccess = (userPosts) => {
    return {
        type: postActionTypes.GET_USERPOSTS_SUCCESS,
        payload: userPosts
    }
}

export const getUserPostsFailure = (error) => {
    return {
        type: postActionTypes.GET_USERPOSTS_FAILURE,
        payload: error
    }
}