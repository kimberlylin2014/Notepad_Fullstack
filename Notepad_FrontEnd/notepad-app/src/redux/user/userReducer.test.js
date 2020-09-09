import userActionTypes from './user.types';
import userReducer from './user.reducer';

describe('User Reducer Tests', () => {
    const initialState = {
        currentUser: null,
        isLoading: false,
        errorMessage: null
    }

    it('Should return intiial state', () => {
        expect(userReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle Register User Start', () => {
        expect(userReducer(initialState, { type: userActionTypes.REGISTER_USER_START, payload: '123'})).toEqual({
            currentUser: null,
            isLoading: true,
            errorMessage: null
        })
    })

    it('should handle Register User Success', () => {
        expect(userReducer(initialState, { type: userActionTypes.REGISTER_USER_SUCCESS, payload: '123'})).toEqual({
            currentUser: '123',
            isLoading: false,
            errorMessage: null
        })
    })

    it('should handle Register User Failure', () => {
        expect(userReducer(initialState, { type: userActionTypes.REGISTER_USER_FAILURE, payload: 'error'})).toEqual({
            currentUser: null,
            isLoading: false,
            errorMessage: 'error'
        })
    })
})