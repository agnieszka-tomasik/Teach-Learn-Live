// store.js
import React, { createContext, useReducer } from 'react';

const initialState = {
    authenticated: false,
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'AUTHENTICATED':
                return {...state, authenticated: true};
            case 'LOGOUT':
                return {...state, authenticated: false};
            default:
                throw new Error(`Invalid action was received: ${action}`);
        };
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }