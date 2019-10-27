import React from 'react';
import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";
import FilterForm from "../contacts/FilterForm";

const Home = () => {
    return (
        <div className='grid-2'>
            <div>
                <ContactForm />
            </div>
            <div>
                <FilterForm />
                <Contacts />
            </div>
        </div>
    );
};

export default Home;
