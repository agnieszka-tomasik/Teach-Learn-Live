// store.js
import React, { createContext, useReducer } from 'react';

const initialState = {

};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'action description':
                const newState = 1;// do something with the action
                return newState;
            default:
                throw new Error(`Invalid action was received: ${action}`);
        };
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }