import React, {Component} from 'react'
import Chart from './ChartComponent'
import { generateInitialConfig, processDataPerYear, getDataForChartPerYear } from './../Utils'
import { SACHIN_DATA } from './../data/sachinDetails'

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      totalRunChartConfig: generateInitialConfig(),
      averageChartConfig: generateInitialConfig(),
      highScoredChartConfig: generateInitialConfig()
    }
  }

  componentDidMount () {
    let calculatedData = processDataPerYear(SACHIN_DATA),
      chartData = getDataForChartPerYear(calculatedData, 'totalRun'),
      config = JSON.parse(JSON.stringify(this.state.totalRunChartConfig))

      config.xAxis.categories = chartData.year
      config.series.push({data: chartData.data})

    this.setState({totalRunChartConfig: config})
  }

  render () {
    return (
      <div>
        <Chart config={this.state.totalRunChartConfig}/>
      </div>
    )
  }
}