import React, {useContext, useRef, useEffect} from 'react';
import ContactContext from '../../context/contacts/contactContext';

const FilterForm = () => {

    const contactContext = useContext(ContactContext);
    const filter = useRef('');
    const {setFilter, clearFilter, filtered} = contactContext;

    useEffect(() => {
        if(filtered === null) {
            filter.current.value = '';
        }
    });


    const onChange = (e) => {
        if(filter.current.value) {
            setFilter(e.target.value);
        } else {
            clearFilter();
        }
    };

    const onClick = () => {
        filter.current.value = '';
        clearFilter();
    };

    return (
        <form className='form--filter'>
            <input ref={filter} type='text' name='filter' placeholder='Search Contacts...' onChange={onChange} />
            <i className='fas fa-times' onClick={() => onClick()} />
        </form>
    );
};

export default FilterForm;
