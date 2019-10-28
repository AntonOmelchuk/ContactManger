import React, {useReducer} from 'react';
import {authReducer} from './authReducer';
import AuthContext from "./authContext";
import axios from "axios";
import {REGISTER_SUCCESS, REGISTER_ERROR, CLEAR_ERRORS} from '../types';

const AuthState = (props) => {

    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    const register = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/users', formData, config);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        } catch(err) {
            dispatch({
                type: REGISTER_ERROR,
                payload: err.response.data.msg
            })
        }
    };

    const clearError = () => dispatch({type: CLEAR_ERRORS});

    return (
        <AuthContext.Provider
        value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            register,
            clearError
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
