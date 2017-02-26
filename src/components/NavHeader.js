import React, { Component } from 'react'
import { Navbar } from 'react-bootstrap'
import logo from './../images/logo.jpg';

export default class NavBar extends Component {
  render() {
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
      </Navbar>
    )
  }
}
