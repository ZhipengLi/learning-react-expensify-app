import authReducer from '../../reducers/auth';

test(`should set uid for login`, () => {
    const uid = 'test uid';
    const state = authReducer(undefined, { type: 'LOGIN', uid });
    expect(state).toEqual({
        uid
    });
});

test(`should clear uid for logout`, () => {
    const state = authReducer(undefined, { type: 'LOGOUT'});
    expect(state).toEqual({});
});
