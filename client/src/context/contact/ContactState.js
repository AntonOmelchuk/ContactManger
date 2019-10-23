import React, {useReducer} from 'react';
import contactReducer from './contactReducer';
import ContactContext from "./contactContext";

const ContactState = props => {
    const initialState = {
        contacts: [
            {id: 1, name: 'Max', email: 'makintosh_kg@ukr.net', phone: '+380984444444'},
            {id: 2, name: 'Vlad', email: 'vlad_kg@ukr.net', phone: '+380984444333'},
            {id: 3, name: 'Vanya', email: 'io_kg@ukr.net', phone: '+380984444222'}
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
    );
};

export default ContactState;
