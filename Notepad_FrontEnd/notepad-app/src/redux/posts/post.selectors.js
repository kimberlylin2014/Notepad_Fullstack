import { createSelector } from 'reselect';

const postSelector = (state) => state.post;

export const selectUserPosts = createSelector(
    [postSelector],
    (post) => post.userPosts
)

export const selectModalDisplay = createSelector(
    [postSelector],
    (post) => post.displayModal
)

export const selectIsUserPostLoading = createSelector(
    [postSelector],
    (post) => post.isLoading
)