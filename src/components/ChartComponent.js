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

    if (type === 'stock') {
      return <ReactHighstock config={config} callback={callback}/>
    } else {
      return <ReactHighcharts config={config} callback={callback}/>
    }
  }
}