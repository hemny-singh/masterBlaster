import React, {Component} from 'react'
import ReactHighcharts from 'react-highcharts' 
import ReactHighstock from 'react-highcharts/ReactHighstock.src'

export default class Chart extends Component {
  prototype = {
    config: React.PropTypes.object,
    callback: React.PropTypes.func,
    type: React.PropTypes.string
  }

  render () {
    const {config, callback, type} = this.props

    return (
      <div className='mb-widget-container'>
      {
        type === 'stock' ? <ReactHighstock config={config} callback={callback}/>
          : <ReactHighcharts config={config} callback={callback}/>
      }
      </div>
    )
  }
}