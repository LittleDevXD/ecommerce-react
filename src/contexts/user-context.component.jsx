import { useState, createContext, useEffect, useReducer } from 'react';

import { onAuthStateChangedHandler, createUserDocFromAuth } from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const USER_REDUCER_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
};

const userReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'SET_CURRENT_USER': 
            return {
                ...state,
                currentUser: payload
            };
        default: 
            throw new Error(`Unhandled tyle ${type} in userReducer`);
    }
};

const INITIAL_STATE = {
    currentUser: null
};

export const UserProvider = ({ children }) => {
    // const [currentUser, setCurrentUser] = useState(null);

    const [{ currentUser }, dispatchUser] = useReducer(userReducer, INITIAL_STATE);

    const setCurrentUser = (user) => (
        dispatchUser({
            type: USER_REDUCER_TYPES.SET_CURRENT_USER,
            payload: user
        })
    )

    const value = {currentUser, setCurrentUser};

    // auth observer 
    useEffect(() => {
        const unsubscribe = onAuthStateChangedHandler((user) => {
            if (user) {
                createUserDocFromAuth(user);
            }
            setCurrentUser(user);
        });

        return unsubscribe;
    }, [])

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    )
}