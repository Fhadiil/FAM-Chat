// Sidebar.js
import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import dashboardRoutes from "../layout/dashboardlayout/dashboardRoutes";

const Sidebar = () => {
  return (
    <Nav vertical>
      {dashboardRoutes.map((route, index) => (
        <NavItem key={index}>
          <NavLink tag={Link} to={route.path}>
            {route.title}
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  );
};

export default Sidebar;
