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