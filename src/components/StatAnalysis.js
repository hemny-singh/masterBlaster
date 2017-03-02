import React, {Component} from 'react'
import Chart from './ChartComponent'
import { ODI_SCORE, TEST_SCORES } from './../data/greatBatsmenScores'
import { getStatAnalysisData, generateInitialConfig } from './../Utils'

export default class StatAnalysis extends Component {
  constructor(props) {
    super(props)
    this.state = {
      matchChartConfig: {},
      runsChartConfig: {},
      averageChartConfig: {},
      centuriesChartConfig: {},
      halfCenturiesChartConfig: {},
      highestScoreChartConfig: {}
    }
  }


  //Generic funtion to set chart configuration and set the sate
  setChartConfigState = (config) => {
    let tempConfig = {}
    Object.keys(config).map((key) => {
      tempConfig = generateInitialConfig()
      tempConfig.chart.type = config[key].chartType || 'line'
      tempConfig.title.text = config[key].title || ''
      tempConfig.xAxis.title.text = config[key].xAxisTitle || ''
      tempConfig.yAxis.title.text = config[key].yAxisTitle || ''
      tempConfig.xAxis.categories = config[key].data.categories,
      tempConfig.series = config[key].data.series
      this.setState({[key]: tempConfig})
    })
  }

  chartSetupHandler = (statistics) => {
    let chartConfigurations = {
        matchChartConfig: {
          title: 'Matches vs Players',
          yAxisTitle: 'Matches',
          xAxisTitle: 'Players',
          data: statistics.match
        }, 
        averageChartConfig: {
          title: 'Average Rate vs Players',
          yAxisTitle: 'Average Rate',
          xAxisTitle: 'Players',
          data: statistics.averageRate
        },
        runsChartConfig: {
          title: 'Total Runs vs Players',
          yAxisTitle: 'Total Runs',
          xAxisTitle: 'Players',
          data: statistics.runs
        },
        highestScoreChartConfig: {
          title: 'Highest Score vs Players',
          yAxisTitle: 'Highest Scores',
          xAxisTitle: 'Players',
          data: statistics.highestScore,
          chartType: 'column'
        },
        centuriesChartConfig: {
          title: 'centuries vs Players',
          yAxisTitle: 'Centuries',
          xAxisTitle: 'Players',
          data: statistics.centuries,
          chartType: 'column'
        },
        halfCenturiesChartConfig: {
          title: 'Half Centuries vs Players',
          yAxisTitle: 'Half centuries',
          xAxisTitle: 'Players',
          data: statistics.halfCenturies,
          chartType: 'column'
        }
    }
    this.setChartConfigState(chartConfigurations)
  }


  componentDidMount () {
    let data = getStatAnalysisData(TEST_SCORES, 'TEST')
    this.chartSetupHandler(data)
  }

  componentWillReceiveProps (nextProps) {
    let data = nextProps.selectedFormat === 'ODI' 
      ?  getStatAnalysisData(ODI_SCORE, 'ODI')
      : getStatAnalysisData(TEST_SCORES, 'TEST') 
    console.log(data)
    this.chartSetupHandler(data)
  }

  componentDidUpdate (prevProps, prevStates) {
    console.log('update')
  }

  render () {
    const {
      highestScoreChartConfig,
      averageChartConfig,
      runsChartConfig,
      centuriesChartConfig,
      halfCenturiesChartConfig,
      matchChartConfig
    } = this.state
    console.log('test')
    return (
      <div>
        <Chart config={runsChartConfig}/>
        <Chart config={averageChartConfig}/>
        <Chart config={matchChartConfig}/>
        <Chart config={centuriesChartConfig}/>
        <Chart config={halfCenturiesChartConfig}/>
        <Chart config={highestScoreChartConfig}/>
      </div>
    )
  }
}