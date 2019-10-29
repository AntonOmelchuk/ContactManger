import React, {useReducer} from 'react';
import ContactContext from './contactContext';
import contactReducer from './contractReducer';
import axios from 'axios';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    SET_FILTER,
    CLEAR_FILTER,
    CONTACT_ERROR,
    GET_CONTACTS,
    CLEAR_CONTACTS
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null,
        loading: true
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    const getContacts = async () => {
        try {
            const response = await axios.get('/api/contacts');
            dispatch({
                type: GET_CONTACTS,
                payload: response.data
            })
        } catch(err) {

        }
    };

    const addContact = async contact => {

        const config = {
            headers: {
                'Content_Type': 'application/json'
            }
        };

        try {
            const response = await axios.post('/api/contacts', contact, config);

            dispatch({
                type: ADD_CONTACT,
                payload: response.data.contact
            })
        } catch(err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response
            })
        }
    };

    const deleteContact = async id => {
        debugger
        try {
            const response  = await axios.delete(`/api/contacts/${id}`);
            debugger
            console.log(response)
            dispatch({
                type: DELETE_CONTACT,
                payload: id
            });
        } catch(err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response
            })
        }
    };

    const setCurrent = contact => dispatch({type: SET_CURRENT, payload: contact});

    const clearCurrent = () => dispatch({type: CLEAR_CURRENT});

    const updateContact = contact => dispatch({type: UPDATE_CONTACT, payload: contact});

    const setFilter = text => dispatch({type: SET_FILTER, payload: text});

    const clearFilter = () => dispatch({type: CLEAR_FILTER});

    const clearContacts = () => dispatch({type: CLEAR_CONTACTS});

    return (
        <ContactContext.Provider
        value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            loading: state.loading,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            setFilter,
            clearFilter,
            getContacts,
            clearContacts
        }}>
            {props.children}
        </ContactContext.Provider>
    )
};

export default ContactState;
