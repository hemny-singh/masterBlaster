import React, { Component } from 'react'
import NavBar from './NavHeader'
import Dashboard from './Dashboard'


export default class MainComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageType: 'dashboard'
    }
  }

  render() {
    return (
      <div className="mb-container">
        <Dashboard/>
      </div>
    )
  }
}

