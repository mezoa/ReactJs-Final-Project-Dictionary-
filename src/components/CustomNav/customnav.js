import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

//Custom Nav Page
//The Navigation Page seen most on the other pages which contains the home page link and logout functionality 
//Add features to the website
const CustomNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="custom-nav">
            <Navbar color="transparent" light expand="md">
                <NavbarBrand href="/" className="newspaper-title">Home</NavbarBrand>
                <NavbarToggler onClick={toggle} className="nr-2" />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/logout" className="newspaper-link">Logout</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default CustomNav;
