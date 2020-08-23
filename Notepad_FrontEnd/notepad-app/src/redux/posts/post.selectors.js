import { createSelector } from 'reselect';

const postSelector = (state) => state.post;

export const selectUserPosts =createSelector(
    [postSelector],
    (post) => post.userPosts
)