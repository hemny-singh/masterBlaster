import React, { Component } from 'react'
import NavBar from './NavHeader'
import Dashboard from './Dashboard'
import StatAnalysis from './StatAnalysis'
import { ButtonGroup, Button } from 'react-bootstrap'


export default class MainComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedFormat: 'TEST'
    }
  }

  updateFormat = (format) => {
    this.setState({selectedFormat: format}, () => {console.log(this.state.selectedFormat)})
  }

  render() {
    const pageTypeMapping = {
      dashboard: 'Dashbaord',
      analysis: 'Statistics Analysis'
    }
    const {pageType, onChangePageType} = this.props
    const {selectedFormat} = this.state

    return (
      <div>
        <NavBar onChangePageType={onChangePageType} 
          pageType={pageTypeMapping[pageType]}/>
        <div className="mb-container">
          {
            pageType === 'dashboard' ? <Dashboard/> :
              <div>
                <ButtonGroup className='mb-btn-group'>
                  <Button className={selectedFormat==='TEST' ? 'selected' : ''}
                    onClick={() => {this.updateFormat('TEST')}}>TEST</Button>
                  <Button className={selectedFormat==='ODI' ? 'selected' : ''}
                    onClick={() => {this.updateFormat('ODI')}}>ODI</Button>
                </ButtonGroup>
                <StatAnalysis selectedFormat={this.state.selectedFormat}/>
              </div>
          }
        </div>
      </div>
    )
  }
}