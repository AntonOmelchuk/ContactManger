import React, {useContext} from 'react';
import ContactContext from '../../context/contacts/contactContext';
import ContactItem from "./ContactItem";

const Contacts = () => {
    const contactsContext = useContext(ContactContext);
    const {contacts} = contactsContext;

    return (
        <div>
            {contacts.map(contact => (
                <ContactItem key={contact.id} contact={contact} />
            ))}
        </div>
    );
};

export default Contacts;
