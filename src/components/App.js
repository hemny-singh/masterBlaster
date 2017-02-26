import React, { Component } from 'react'
import NavBar from './NavHeader'
import Dashboard from './Dashboard'


export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Dashboard/>
      </div>
    )
  }
}

