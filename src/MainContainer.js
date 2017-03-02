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
    return (
      <MainComponent 
        pageType={this.state.pageType}
        onChangePageType={this.onChangePageType} />
    )
  }
}

