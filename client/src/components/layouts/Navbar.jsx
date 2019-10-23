import React from 'react';
import PropTypes from 'prop-types';

const Navbar = ({title, icon}) => {
    return (
        <div className='navbar bg-primary'>
            <icon className={icon} />{title}
        </div>
    );
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
};

Navbar.defaultProps = {
    title: 'Contact Manager',
    icon: 'fas fa-id-card-alt'
}

export default Navbar;
