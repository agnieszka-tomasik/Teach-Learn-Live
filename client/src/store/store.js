// store.js
import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const initialState = {
    authenticated: false,
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer((currState, action) => {
        switch (action.type) {
        case 'AUTHENTICATED':
            return {
                ...currState,
                authenticated: true,
                user: {
                    ...action.payload.user,
                },
            };
        case 'LOGOUT':
            return { ...currState, authenticated: false };
        default:
            throw new Error(`Invalid action was received: ${action}`);
        }
    }, initialState);

    // Initalize state.
    useEffect(() => {
        axios.get('/session').then((response) => {
            if (response.data && response.data.valid) {
                dispatch({ type: 'AUTHENTICATED', payload: response.data });
            } else {
                console.error(response.data);
            }
        });
    }, []);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
