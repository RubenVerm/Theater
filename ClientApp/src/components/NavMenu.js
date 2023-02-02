import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "./services/authService";

import "bootstrap/dist/css/bootstrap.min.css";

import './NavMenu.css';

export const NavMenu = () => {
const [collapsed, setCollapsed] = useState(true);
const [currentUser, setCurrentUser] = useState(undefined);

const toggleNavbar = () => {
setCollapsed(!collapsed);
}
useEffect(() => {
  const user = AuthService.getCurrentUser();

  if (user) {
    setCurrentUser(user);
  }
}, []);

const logOut = () => {
  AuthService.logout();
};
return (
  <header>
  <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
  <NavbarBrand tag={Link} to="/">Project2</NavbarBrand>
  <NavbarToggler onClick={toggleNavbar} className="mr-2" />
  <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
  <ul className="navbar-nav flex-grow">
  <NavItem>
  <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
  </NavItem>
  <NavItem>
  <NavLink tag={Link} className="text-dark" to="/Agenda">Agenda</NavLink>
  </NavItem>
  <NavItem>
  <NavLink tag={Link} className="text-dark" to="/Tickets">Tickets</NavLink>
  </NavItem>
  <NavItem>
  <NavLink tag={Link} className="text-dark" to="/Huren">Huren</NavLink>
  </NavItem>
  <NavItem>
  <NavLink tag={Link} className="text-dark" to="/Doneer">Doneer</NavLink>
  </NavItem>
  <NavItem>
  <NavLink tag={Link} className="text-dark" to="/Overons">Over ons</NavLink>
  </NavItem>
  <NavItem>
  <NavLink tag={Link} className="text-dark" to="/Contact">Contact</NavLink>
  </NavItem>
  <NavItem>
  <NavLink tag={Link} className="text-dark" to="/Admin">Admin paneel</NavLink>
  </NavItem>
  <NavItem>
  <NavLink tag={Link} className="text-dark" to="/Login">Login</NavLink>
  </NavItem>
  <NavItem>
  <NavLink tag={Link} className="text-dark" to="/Registreer">Registreer</NavLink>
  </NavItem>
  
    </ul>
  </Collapse>
  </Navbar>
  </header>
  );
  };
