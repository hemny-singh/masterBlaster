import React, { Component } from 'react'
import NavBar from './components/NavHeader'
import MainComponent from './components/MainComponent'


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageType: 'dashboard'
    }
  }

  onChangePageType = (pageType) => {
    this.setState({pageType: pageType})
  }

  render() {
    const pageTypeMapping = {
      dashboard: 'Dashbaord',
      analysis: 'Statistics Analysis'
    }
    return (
      <div>
        <NavBar onChangePageType={this.onChangePageType} 
          pageType={pageTypeMapping[this.state.pageType]}/>
        <MainComponent pageType={this.state.pageType}/>
      </div>
    )
  }
}

