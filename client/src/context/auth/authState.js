import React, {useReducer} from 'react';
import {authReducer} from './authReducer';
import AuthContext from "./authContext";
import axios from "axios";
import {
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    CLEAR_ERRORS,
    AUTH_ERROR,
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from '../types';
import setAuthToken from "../../utils/setAuthToken";

const AuthState = (props) => {

    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    const loadUser = async () => {

        if(localStorage.token) {
            setAuthToken(localStorage.token)
        }

        try {
            const response = await axios.get('/api/auth');

            dispatch({
                type: USER_LOADED,
                payload: response.data
            });
        } catch(err) {
            dispatch({type: AUTH_ERROR})
        }
    };

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
            });
            loadUser();
        } catch(err) {
            dispatch({
                type: REGISTER_ERROR,
                payload: err.response.data.msg
            })
        }
    };

    const login = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await axios.post('http://localhost:3333/api/auth', formData, config);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            });

            loadUser();
        } catch(err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg
            })
        }
    };

    const logout = () => dispatch({type: LOGOUT})

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
            clearError,
            loadUser,
            login,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
