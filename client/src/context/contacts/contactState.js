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
    CLEAT_FILTER,
    CONTACT_ERROR
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: [],
        current: null,
        filtered: null,
        error: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

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

    const deleteContact = id => dispatch({type: DELETE_CONTACT, payload: id});

    const setCurrent = contact => dispatch({type: SET_CURRENT, payload: contact});

    const clearCurrent = () => dispatch({type: CLEAR_CURRENT});

    const updateContact = contact => dispatch({type: UPDATE_CONTACT, payload: contact});

    const setFilter = text => dispatch({type: SET_FILTER, payload: text});

    const clearFilter = () => dispatch({type: CLEAT_FILTER});

    return (
        <ContactContext.Provider
        value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            setFilter,
            clearFilter
        }}>
            {props.children}
        </ContactContext.Provider>
    )
};

export default ContactState;
