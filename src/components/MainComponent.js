import React, { Component } from 'react'
import NavBar from './NavHeader'
import Dashboard from './Dashboard'
import StatAnalysis from './StatAnalysis'
import { ButtonGroup, Button } from 'react-bootstrap'


export default class MainComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedFormat: 'ODI',
      pageType: 'dashboard'
    }
  }

  onChangePageType = (pageType) => {
    this.setState({pageType: pageType,
      selectedFormat: pageType === 'dashboard' ? 'ODI' : this.state.selectedFormat})
  }

  //Select Format if it's ODI or Test
  updateFormat = (format) => {
    this.setState({selectedFormat: format})
  }

  render() {
    const pageTypeMapping = {
      dashboard: 'Dashbaord',
      analysis: 'Statistics Analysis'
    }
    const {selectedFormat, pageType} = this.state

    return (
      <div>
        <NavBar onChangePageType={this.onChangePageType} 
          pageType={pageTypeMapping[pageType]}/>
        <div className="mb-container">
          {
            <div className="main-container">
              <ButtonGroup className='mb-btn-group'>
                <Button className={selectedFormat==='ODI' ? 'selected' : ''}
                  onClick={() => {this.updateFormat('ODI')}}>ODI</Button>
                <Button className={selectedFormat==='TEST' ? 'selected' : ''}
                  onClick={() => {this.updateFormat('TEST')}} 
                  disabled={pageType === 'dashboard' ? true : false}>TEST</Button>
              </ButtonGroup>
              {pageType === 'dashboard' ? <Dashboard/>
              : <StatAnalysis selectedFormat={this.state.selectedFormat}/>}
            </div>
          }
        </div>
      </div>
    )
  }
}