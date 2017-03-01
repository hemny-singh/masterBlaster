import React, { Component } from 'react'
import { Navbar, Nav, NavDropdown, MenuItem} from 'react-bootstrap'
import logo from './../images/logo.png';

export default class NavBar extends Component {
  render() {
    const { onChangePageType, pageType } = this.props
    return (
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">
              <img src={logo} />
            </a>
            MasterBlaster
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavDropdown eventKey={1} id="page-type-dropdown" title={pageType}>
            <MenuItem eventKey={1.1} onClick={() => onChangePageType('dashboard')}>Dashboard</MenuItem>
            <MenuItem eventKey={1.2} onClick={() => onChangePageType('analysis')}>Statistics Analysis</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    )
  }
}
