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
                    <CSSTransition key={contact.id} timeout={500} classNames='item'>
                        <ContactItem  contact={contact} />
                    </CSSTransition>
                    ))) :
                    (contacts.map(contact => (
                        <CSSTransition key={contact.id} timeout={500} classNames='item'>
                            <ContactItem contact={contact} />
                        </CSSTransition>
                    )))}
            </TransitionGroup>
        </>
    );
};

export default Contacts;
