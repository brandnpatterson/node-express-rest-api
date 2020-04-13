import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { Link } from 'react-router-dom';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={Link} to="/">
          Node / React
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/messages">
                Messages
              </NavLink>
            </NavItem>
          </Nav>
          <Nav navbar>
            <NavItem>
              <NavLink tag={Link} to="/users">
                Users
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/profile">
                Profile
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
