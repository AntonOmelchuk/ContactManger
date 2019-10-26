import React, {useState, useContext} from 'react';
import ContactContext from '../../context/contacts/contactContext';

const ContactForm = () => {

    const defaultValue = {
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    };

    const [contact, setContact]= useState(defaultValue);
    const contacts = useContext(ContactContext);

    const {name, email, phone, type} = contact;

    const onChange = e => setContact({...contact, [e.target.name]: e.target.value});
    const onSubmit = (e) => {
        e.preventDefault();
        contacts.addContact(contact);
        setContact(defaultValue)
    };

    return (
        <form onSubmit={onSubmit}>
            <h2 className='text-primary'>Add Contact</h2>
            <input type='text' name='name' placeholder='Name' value={name} onChange={onChange} />
            <input type='email' name='email' placeholder='Email' value={email} onChange={onChange} />
            <input type='text' name='phone' placeholder='Phone' value={phone} onChange={onChange} />
            <h5>Contact Type</h5>
            <input type='radio' name='type' value='personal' checked={type === 'personal'} onChange={onChange} />
            {' '}Personal{' '}
            <input type='radio' name='type' value='professional' checked={type === 'professional'} onChange={onChange} />
            {' '}Professional
            <input type='submit' value='Add Contact' className='btn btn-primary btn-block' />
        </form>
    );
};

export default ContactForm;
