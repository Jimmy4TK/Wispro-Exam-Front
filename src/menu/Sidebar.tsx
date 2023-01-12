import React from "react"
import { NavLink } from "react-router-dom"
import { Nav } from 'react-bootstrap';
import "./Sidebar.css"

export default function NavBarMenu() {
  return (
      <div>
        <div className="line bg-secondary"></div>
        <Nav className="position-fixed h-100 sidebar flex-column p-3 text-white bg-dark">
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item"><NavLink className="nav-link text-white" to="/login">Login</NavLink>&nbsp;&nbsp;</li>
            <li className="nav-item"><NavLink className="nav-link text-white" to="/register">Register</NavLink>&nbsp;&nbsp;</li>
          </ul>
        </Nav>
      </div>
  )
}