import { fetchRegisterUser } from './user.apis';

describe('Test User APIs', () => {
    it('testing Fetch Register API', () => {
        const userData = {
            name: 'pryanka',
            email: "pryanka@notepad.com",
            password: 'cookies'
        }
        const mockFetch = jest.fn().mockReturnValue(Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                id: 95, name: 'pryanka', email: "pryanka@notepad.com", joined: "2020-09-09T04:23:31.981Z", comments: null
            })      
        }))

        expect.assertions(1)
        return fetchRegisterUser(mockFetch, userData).then(data => {
            expect(data.name).toEqual('pryanka')
        })
    })

    it('testing Fetch Sign In User API', () => {
        const userData = {email: "kimberly@notepad.com", password: "cookies"}
        const mockFetch = jest.fn().mockReturnValue(Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                comments: ["211"],
                email: "kimberly@notepad.com",
                id: 75,
                joined: "2020-08-31T03:19:15.374Z",
                name: "kimberly",
            })      
        }))

        expect.assertions(1)
        return fetchRegisterUser(mockFetch, userData).then(data => {
            expect(data.email).toEqual('kimberly@notepad.com')
        })
    })

})