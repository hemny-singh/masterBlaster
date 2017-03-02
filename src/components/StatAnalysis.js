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


  //Generic funtion to set custom chart configuration and update the state
  setChartConfigState = (config) => {
    let tempConfig = {}
    Object.keys(config).map((key) => {
      tempConfig = generateInitialConfig()
      tempConfig.chart.type = config[key].chartType || 'line'
      tempConfig.title.text = config[key].title || ''
      tempConfig.xAxis.title.text = config[key].xAxisTitle || ''
      tempConfig.yAxis.title.text = config[key].yAxisTitle || ''
      tempConfig.yAxis.plotBands = config[key].plotBands || {}
      tempConfig.xAxis.categories = config[key].data.categories,
      tempConfig.series = config[key].data.series
      tempConfig.plotOptions = config[key].plotOptions || {}
      //Updating react state here dynamically.
      this.setState({[key]: tempConfig})
    })
  }

  chartSetupHandler = (statistics) => {
    //Write your custom chart configuration here to override initial chart configurations
    //Key should be the same as your state chart configuration
    let chartConfigurations = {
        matchChartConfig: {
          title: 'No. of Matches vs Players',
          yAxisTitle: 'Matches',
          xAxisTitle: 'Players',
          chartType: 'column',
          data: statistics.match,
          plotOptions: {
            series: {
              pointWidth: 20
            }
          },
          plotBands: [{
              from: 1,
              to: statistics.match.series[0].data[0],
              color: 'rgba(68, 170, 213, 0.2)',
              label: {
                  text: 'Sachin\'s Record',
                  rotation: -90
              }
          }]
        }, 
        averageChartConfig: {
          title: 'Batting Score Average vs Players',
          yAxisTitle: 'Average Rate',
          xAxisTitle: 'Players',
          data: statistics.averageRate,
          chartType: 'column',
          plotOptions: {
            series: {
              pointWidth: 20
            }
          },
          plotBands: [{
              from: 1,
              to: statistics.averageRate.series[0].data[0],
              color: 'rgba(68, 170, 213, 0.2)',
              label: {
                  text: 'Sachin\'s Average Rate',
                  rotation: -90
              }
          }]
        },
        runsChartConfig: {
          title: 'Total Batting Score vs Players',
          yAxisTitle: 'Total Batting Score',
          xAxisTitle: 'Players',
          data: statistics.runs,
          chartType: 'column',
          plotOptions: {
            series: {
              pointWidth: 20
            }
          },
          plotBands: [{
              from: 1,
              to: statistics.runs.series[0].data[0],
              color: 'rgba(68, 170, 213, 0.2)',
              label: {
                  text: 'Sachin\'s Batting Score',
                  rotation: -90
              }
          }]
        },
        highestScoreChartConfig: {
          title: 'Individual Highest Score vs Players',
          yAxisTitle: 'Highest Scores',
          xAxisTitle: 'Players',
          data: statistics.highestScore,
          chartType: 'column',
          plotOptions: {
            series: {
              pointWidth: 20
            }
          },
          plotBands: [{
              from: 1,
              to: statistics.highestScore.series[0].data[0],
              color: 'rgba(68, 170, 213, 0.2)',
              label: {
                  text: 'Sachin\'s Highest Score',
                  rotation: -90
              }
          }]
        },
        centuriesChartConfig: {
          title: 'Centuries Count vs Players',
          yAxisTitle: 'Centuries',
          xAxisTitle: 'Players',
          data: statistics.centuries,
          chartType: 'column',
          plotOptions: {
            series: {
              pointWidth: 20
            }
          },
          plotBands: [{
              from: 1,
              to: statistics.centuries.series[0].data[0],
              color: 'rgba(68, 170, 213, 0.2)',
              label: {
                  text: 'Sachin\'s Centuries Count',
                  rotation: -90
              }
          }]
        },
        halfCenturiesChartConfig: {
          title: 'Half Centuries Count vs Players',
          yAxisTitle: 'Half centuries Count ',
          xAxisTitle: 'Players',
          data: statistics.halfCenturies,
          chartType: 'column',
          plotOptions: {
            series: {
              pointWidth: 20
            }
          },
          plotBands: [{
              from: 1,
              to: statistics.halfCenturies.series[0].data[0],
              color: 'rgba(68, 170, 213, 0.2)',
              label: {
                  text: 'Sachin\'s Half Centuries Count',
                  rotation: -90
              }
          }]
        }
    }

    this.setChartConfigState(chartConfigurations)
  }

  //Get chart data on Component mount
  componentDidMount () {
    let data = getStatAnalysisData(ODI_SCORE, 'ODI')
    this.chartSetupHandler(data)
  }

  //Will call this function when props will change.
  componentWillReceiveProps (nextProps) {
    let data = nextProps.selectedFormat === 'ODI' 
      ?  getStatAnalysisData(ODI_SCORE, 'ODI')
      : getStatAnalysisData(TEST_SCORES, 'TEST') 
    this.chartSetupHandler(data)
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