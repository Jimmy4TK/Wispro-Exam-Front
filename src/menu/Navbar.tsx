import React from "react"
import { NavLink } from "react-router-dom"
import { Button , Navbar , Nav , NavDropdown } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import "./Navbar.css"
import { useSessionUser } from "../store/userStore"
import { useSessionIsp } from "../store/ispStore"
import { logout } from "../user/userService"
import { logoutisp } from "../isp/ispService";

export default function NavBarMenu() {
  const user = useSessionUser()
  const isp = useSessionIsp()
  const btnprofile = <Button className="btn-circle btn-success mb-2 mx-2"><PersonCircle className="mb-2"/></Button>
  
  const menu = user ? <NavDropdown
    className="position-absolute end-0 top-0"
    title={btnprofile}
    menuVariant="dark dropmenu"
  >

    <NavLink to="/password" className="dropdown-item">Change Password</NavLink>
    <NavLink to="/info" className="dropdown-item">Info</NavLink>
    <NavDropdown.Divider />
    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
  </NavDropdown>
  : isp ?
    <NavDropdown
    className="position-absolute end-0 top-0"
    title={btnprofile}
    menuVariant="dark dropmenu"
  >

    <NavLink to="/password" className="dropdown-item">Change Password</NavLink>
    <NavLink to="/info" className="dropdown-item">Info</NavLink>
    <NavDropdown.Divider />
    <NavDropdown.Item onClick={logoutisp}>Logout</NavDropdown.Item>
  </NavDropdown> : <NavLink to="/login"><Button className="btn btn-secondary mb-2 mx-2 position-absolute end-0">Login</Button></NavLink>

  if (isp==undefined){
    return (
      <Navbar className="position-relative" bg="dark" variant="dark">
        <Navbar.Brand className="ms-2 me-5">Wispro</Navbar.Brand>
          <Nav className="me-auto ms-0">
            <NavLink className="navlink" to="/">Welcome</NavLink>&nbsp;&nbsp;
            <NavLink className="navlink" to="/services">Services</NavLink>&nbsp;&nbsp;
            {menu}&nbsp;&nbsp;
          </Nav>
    </Navbar>
    )
  } else {
    return (
      <Navbar className="position-relative" bg="dark" variant="dark">
        <Navbar.Brand className="ms-2 me-5">Wispro</Navbar.Brand>
          <Nav className="me-auto ms-0">
            <NavLink className="navlink" to="/">Welcome</NavLink>&nbsp;&nbsp;
            <NavLink className="navlink" to="/services">Services</NavLink>&nbsp;&nbsp;
            <NavLink className="navlink" to="/newservice">Crear nuevo Servicio</NavLink>&nbsp;&nbsp;
            <NavLink className="navlink" to="/pending">Ver solicitudes pendientes</NavLink>&nbsp;&nbsp;
            <NavLink className="navlink" to="/reject">Ver solicitudes rechazadas</NavLink>&nbsp;&nbsp;
            {menu}&nbsp;&nbsp;
          </Nav>
      </Navbar>
    )
  }
}