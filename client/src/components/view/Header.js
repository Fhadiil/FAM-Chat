import React from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  Collapse,
} from "reactstrap";
import { Link } from "react-router-dom";

const Header = ({ links }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const navbarStyle = {
    // backgroundColor: "#A78BFA",
    backgroundColor: "#052659",
  };

  return (
    <Navbar style={navbarStyle} dark expand="md">
      <NavbarBrand href="/">FAM CHAT</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          {links.map((link, index) => (
            <NavItem key={index}>
              <NavLink tag={Link} to={link.to}>
                {link.label}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
