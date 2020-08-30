import { createSelector } from 'reselect';

const userSelector = (state) => state.user;

export const selectCurrentUser = createSelector(
    [userSelector],
    (user) => user.currentUser
)

export const selectIsUserLoading = createSelector(
    [userSelector],
    (user) => user.isLoading
)

export const selectUserErrorMessage= createSelector(
    [userSelector],
    (user) => user.errorMessage
)