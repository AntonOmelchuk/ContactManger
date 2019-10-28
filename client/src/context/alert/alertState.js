import React, {useReducer} from 'react';
import uuid from 'uuid';
import AlertContext from './alertContext';
import alertReducer from "./alertReducer";
import {SET_ALERT, CLEAR_ALERT} from '../types';

const AlertState = (props) => {

    const initialState = [];

    const [state, dispatch] = useReducer(alertReducer, initialState);

    const setAlert = (type, msg, timeout = 3000) => {

        if(state.length > 0) return;

        const id = uuid.v4();
        dispatch({
            type: SET_ALERT,
            payload: {type, msg, id}
        });

        setTimeout(() => dispatch({type: CLEAR_ALERT, payload: id}), timeout)
    };

    return (
        <AlertContext.Provider
        value={{
            alerts: state,
            setAlert
        }}>
            {props.children}
        </AlertContext.Provider>
    );
};

export default AlertState;
