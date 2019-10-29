import React, {useContext} from 'react';
import ContactContext from '../../context/contacts/contactContext';
import ContactItem from "./ContactItem";
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const Contacts = () => {
    const contactsContext = useContext(ContactContext);
    const {contacts, filtered} = contactsContext;

    return (
        <>
            <TransitionGroup>
                {filtered !== null ? (filtered.map(contact => (
                    <CSSTransition key={contact._id} timeout={500} classNames='item'>
                        <ContactItem  contact={contact} />
                    </CSSTransition>
                    ))) :
                    contacts !== null ?
                    (contacts.map(contact => (
                        <CSSTransition key={contact._id} timeout={500} classNames='item'>
                            <ContactItem contact={contact} />
                        </CSSTransition>
                    ))) :
                    <h1>No contacts</h1>
                }
            </TransitionGroup>
        </>
    );
};

export default Contacts;
