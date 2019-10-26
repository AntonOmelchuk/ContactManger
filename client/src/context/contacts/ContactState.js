import React, {useReducer} from 'react';
import ContactContext from './contactContext';
import contactReducer from './contractReducer';
import uuid from 'uuid';

export const ContactState = props => {
    const initialState = {
        contacts: [
            {id: 1, name: 'Vlad', email: 'vlad@kg.com', phone: '+3809892018855', type: 'personal'},
            {id: 2, name: 'Max', email: 'max@kg.com', phone: '+3809892018833', type: 'personal'},
            {id: 3, name: 'Vanya', email: 'vanya@kg.com', phone: '+3809892018844', type: 'professional'}
        ]
    };


    const [state, dispatch] = useReducer(contactReducer, initialState);
    return (
        <ContactContext.Provider
        value={{
            contacts: state.contacts
        }}>
            {props.children}
        </ContactContext.Provider>
    )
};
