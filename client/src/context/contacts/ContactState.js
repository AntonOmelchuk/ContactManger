import React, {useReducer} from 'react';
import ContactContext from './contactContext';
import contactReducer from './contractReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT
} from '../types';
import uuid from 'uuid';

export const ContactState = props => {
    const initialState = {
        contacts: [
            {id: 1, name: 'Vlad', email: 'vlad@kg.com', phone: '+3809892018855', type: 'personal'},
            {id: 2, name: 'Max', email: 'max@kg.com', phone: '+3809892018833', type: 'personal'},
            {id: 3, name: 'Vanya', email: 'vanya@kg.com', phone: '+3809892018844', type: 'professional'}
        ],
        current: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    const addContact = contact => {
        contact.id = uuid.v4();
        dispatch({type: ADD_CONTACT, payload: contact})
    };

    const deleteContact = id => dispatch({type: DELETE_CONTACT, payload: id});

    const setCurrent = contact => dispatch({type: SET_CURRENT, payload: contact});

    const clearCurrent = () => dispatch({type: CLEAR_CURRENT});

    const updateContact = contact => dispatch({type: UPDATE_CONTACT, payload: contact});

    return (
        <ContactContext.Provider
        value={{
            contacts: state.contacts,
            current: state.current,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact
        }}>
            {props.children}
        </ContactContext.Provider>
    )
};
